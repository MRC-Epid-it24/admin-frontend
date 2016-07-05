'use strict';

/* Packer service
*
* Converts JSON objects received from the API server to more convenient format
* for JS code.
*
* In particular, converts server-side optional data encoding (an array with 0 or
* 1 objects) to a structure with 2 fields: defined and value.
*/

var _ = require('underscore');

module.exports = function(app) {
    app.service('Packer', [ serviceFun ]);
};

function serviceFun() {

	var instance = {};

	/* These functions convert the server-side optional data encoding to
	* a more appropriate structure for use with Angular templates.
	*
	* Server-side encoding is an array with either 0 (value not present) or exactly
	* 1 (value present) elements.
	*
	* For the reasoning behind this encoding see https://github.com/lihaoyi/upickle-pprint/issues/75
	*
	* JavaScript encoding is a structure with two fields: defined (boolean, true
	* if the value is present, false if the value is absent) and value which is
	* the actual data. If defined is false, value will be null.
	*/

	instance.unpackOption = function (option)
	{
		if (option.length == 1)
			return { defined: true, value: option[0] };
		else
			return { defined: false, value: null };
	};

	instance.packOption = function (option)
	{
		if (option.defined)
			return [option.value];
		else
			return [];
	};

	instance.packItemDefinition = function (unpacked)
	{
		var packed = Object();

		packed.code = unpacked.code;

		// Ready meal option
		if (unpacked.overrideReadyMealOption) {
			packed.attributes.readyMealOption = Array(unpacked.booleanReadyMealOption);
		} else {
			packed.attributes.readyMealOption = Array();
		}

		// Same as before option
		if (unpacked.overrideSameAsBeforeOption) {
			packed.attributes.sameAsBeforeOption = Array(unpacked.booleanSameAsBeforeOption);
		} else {
			packed.attributes.sameAsBeforeOption = Array();
		}

		// Reasonable amount
		if (unpacked.overrideReasonableAmount) {
			packed.attributes.reasonableAmount = Array(unpacked.reasonableAmount);
		} else {
			packed.attributes.reasonableAmount = Array();
		}

		packed.localData.portionSize = packPortionSizes(unpacked.portionSize);

		return packed;
	};

	// Common fields for food and category definition
	instance.unpackCommonDefinitionFields = function (packed)
	{
		var unpacked = Object();

		unpacked.version = packed.version;
		unpacked.code = packed.code;
		unpacked.englishDescription = packed.englishDescription;

		unpacked.attributes = Object();

		unpacked.attributes.readyMealOption = instance.unpackOption(packed.attributes.readyMealOption);
		unpacked.attributes.sameAsBeforeOption = instance.unpackOption(packed.attributes.sameAsBeforeOption);
		unpacked.attributes.reasonableAmount = instance.unpackOption(packed.attributes.reasonableAmount);

		unpacked.localData = Object();

		unpacked.localData.version = instance.unpackOption(packed.localData.version);
		unpacked.localData.localDescription = instance.unpackOption(packed.localData.localDescription);

		unpacked.localData.portionSize = instance.unpackPortionSizes(packed.localData.portionSize);

		return unpacked;
	};

	instance.unpackFoodDefinition = function(packed)
	{
		var unpacked = instance.unpackCommonDefinitionFields(packed);

		unpacked.groupCode = packed.groupCode;
		unpacked.useExclusivelyInThisLocale = false;
		unpacked.localData.nutrientTableCodes = packed.localData.nutrientTableCodes;
		unpacked.localData.doNotUseInThisLocale = packed.localData.doNotUse;

		return unpacked;
	};

	instance.unpackCategoryDefinition = function(packed)
	{
		var unpacked = instance.unpackCommonDefinitionFields(packed);

		unpacked.isHidden = packed.isHidden;

		return unpacked;
	};

	instance.unpackCommonHeaderFields = function(packed)
	{
		var unpacked = Object();

		unpacked.code = packed.code;
		unpacked.englishDescription = packed.englishDescription;
		unpacked.localDescription = instance.unpackOption(packed.localDescription);

		// Try to use the local description but fall back to English if it is
		// not defined
		unpacked.displayName = unpacked.localDescription.defined ? unpacked.localDescription.value : unpacked.englishDescription;

		return unpacked;
	};

	instance.unpackCategoryHeader = function(packed)
	{
		var unpacked = instance.unpackCommonHeaderFields(packed);
		unpacked.type = 'category';
		unpacked.isHidden = packed.isHidden;
		return unpacked;
	};

	instance.unpackFoodHeader = function(packed)
	{
		var unpacked = instance.unpackCommonHeaderFields(packed);
		unpacked.doNotUseInThisLocale = packed.doNotUse;
		unpacked.type = 'food';
		return unpacked;
	};

	instance.unpackFoodGroup = function(packed)
	{
		var unpacked = {
			id : packed.id,
			englishDescription : packed.englishDescription,
			localDescription : instance.unpackOption(packed.localDescription),
		};

		unpacked.displayName = unpacked.localDescription.defined ? unpacked.localDescription.value : unpacked.englishDescription;

		return unpacked;
	}

	instance.unpackPortionSizes = function(packedPortionSizes) {

		return _.map(packedPortionSizes, function(packed) {

			var unpacked = {
				method: packed.method,
				description: packed.description,
				imageUrl: packed.imageUrl,
				useForRecipes: packed.useForRecipes
			};

			unpacked.parameters = {};

			switch (packed.method) {

				case "standard-portion":

					unpacked.parameters.units = [];

					_.each(packed.parameters, function(parameter, index) {

						var name = parameter.name;
						var indexArray = name.match(/\d+/);
						var index = 0;

						if (indexArray) {
							index = indexArray[0];

							if (!unpacked.parameters.units[index]) { unpacked.parameters.units[index] = new Object(); }

							if (parameter.name.indexOf("name") > -1) {
								unpacked.parameters.units[index].name = parameter.value; // name
							} else if (parameter.name.indexOf("weight") > -1) {
								unpacked.parameters.units[index].value = parameter.value; // value
							} else if (parameter.name.indexOf("omit-food-description") > -1) {
								unpacked.parameters.units[index].omitFoodDescription = (parameter.value == "true") ? true : false; // omit food description
							}
						};
					})
					break;

				case "guide-image":

					_.each(packed.parameters, function(param, index) {
						if (param.name == 'guide-image-id') {
							unpacked.parameters.guide_image_id = param.value;
						}
					});

					break;

				case "as-served":

					_.each(packed.parameters, function(oaram, index) {

						unpacked.parameters.useLeftoverImages = false;

						if (param.name == 'serving-image-set') {
							unpacked.parameters.serving_image_set = param.value;
						} else if (param.name == 'leftovers-image-set') {
							unpacked.parameters.leftovers_image_set = param.value;
							unpacked.parameters.useLeftoverImages = true;
						}

					});

					break;

				case "drink-scale":

					_.each(packed.parameters, function(param, index) {

						if (param.name == 'drinkware-id') {
							unpacked.parameters.drinkware_id = param.value;
						} else if (param.name == 'initial-fill-level') {
							unpacked.parameters.initial_fill_level = param.value;
						} else if (param.name == 'skip-fill-level') {
							unpacked.parameters.skip_fill_level = (param.value == "true") ? true : false;
						}

					});

					break;

				case "cereal":

					_.each(packed.parameters, function(param, index) {

						if (param.name == 'type') {
							unpacked.parameters.cereal_type = param.value;
						}

					});

					break;

				case "milk-on-cereal":
					break;

				case "milk-in-a-hot-drink":
					break;

				case "pizza":
					break;

				default:
					console.log("Other portion size method: " + packed.method);
					break;
			}

			return unpacked;
		});
	};

	instance.packInheritableAttributes = function(unpacked) {
		return {
			readyMealOption: instance.packOption(unpacked.readyMealOption),
			sameAsBeforeOption: instance.packOption(unpacked.sameAsBeforeOption),
			reasonableAmount: instance.packOption(unpacked.reasonableAmount)
		};
	}

	instance.packCategoryBasicDefinition = function(unpacked) {
		return {
			version: unpacked.version,
			code: unpacked.code,
			englishDescription: unpacked.englishDescription,
			isHidden: unpacked.isHidden,
			attributes: instance.packInheritableAttributes(unpacked.attributes)
		};
	}

	instance.packFoodBasicDefinition = function(unpacked) {
		return {
			version: unpacked.version,
			code: unpacked.code,
			groupCode: unpacked.groupCode,
			englishDescription: unpacked.englishDescription,
			attributes: instance.packInheritableAttributes(unpacked.attributes),
		};
	}

	instance.packNewFoodDefinition = function(unpacked) {
		return {
			code: unpacked.code,
			groupCode: unpacked.groupCode,
			englishDescription: unpacked.englishDescription,
			attributes: instance.packInheritableAttributes(unpacked.attributes),
		};
	}

	instance.packNewCategoryDefinition = function(unpacked) {
		return {
			code: unpacked.code,
			isHidden: unpacked.isHidden,
			englishDescription: unpacked.englishDescription,
			attributes: instance.packInheritableAttributes(unpacked.attributes),
		};
	}

	instance.packFoodLocalDefinition = function(unpacked) {
		return {
			version: instance.packOption(unpacked.version),
			localDescription: instance.packOption(unpacked.localDescription),
			nutrientTableCodes: unpacked.nutrientTableCodes,
			portionSize: instance.packPortionSizes(unpacked.portionSize),
			doNotUse: unpacked.doNotUseInThisLocale
		};
	}

	instance.packCategoryLocalDefinition = function(unpacked) {
		return {
			version: instance.packOption(unpacked.version),
			localDescription: instance.packOption(unpacked.localDescription),
			portionSize: instance.packPortionSizes(unpacked.portionSize)
		};
	}

	instance.packPortionSizes = function(unpackedPortionSizes)
	{
		return _.map(unpackedPortionSizes, function(portionSize, index) {

			var packedPortionSize = Object();

			packedPortionSize.method = portionSize.method;
			packedPortionSize.description = portionSize.description;
			packedPortionSize.imageUrl = portionSize.imageUrl;
			packedPortionSize.useForRecipes = portionSize.useForRecipes;

			switch (portionSize.method) {

				case "standard-portion":

					packedPortionSize.parameters = [];

					packedPortionSize.parameters.push({
						name: 'units-count',
						value: portionSize.parameters.units.length.toString()
					});

					_.each(portionSize.parameters.units, function(parameter, index) {

						var name;

						name = 'unit#-name';
						packedPortionSize.parameters.push({
							name: name.replace('#', index),
							value: parameter.name.toString()
						});

						name = 'unit#-weight';
						packedPortionSize.parameters.push({
							name: name.replace('#', index),
							value: parameter.value.toString()
						});

						name = 'unit#-omit-food-description';
						packedPortionSize.parameters.push({
							name: name.replace('#', index),
							value: parameter.omitFoodDescription.toString()
						});

					})

					break;

				case "guide-image":

					packedPortionSize.parameters = [{ name: "guide-image-id", value: portionSize.parameters.guide_image_id}];

					break;

				case "as-served":

					packedPortionSize.parameters = [{ name: "serving-image-set", value: portionSize.parameters.serving_image_set }];

					if (portionSize.parameters.useLeftoverImages)
						packedPortionSize.parameters.push({ name: "leftovers-image-set", value: portionSize.parameters.leftovers_image_set });

					break;

				case "drink-scale":

					packedPortionSize.parameters = [
						{ name: "drinkware-id", value: portionSize.parameters.drinkware_id },
						{ name: "initial-fill-level", value: portionSize.parameters.initial_fill_level.toString() },
						{ name: "skip-fill-level", value: portionSize.parameters.skip_fill_level.toString() }
					];

					break;

				case "cereal":

					packedPortionSize.parameters = [
						{ name: "cereal-type", value: portionSize.parameters.cereal_type }
					];

					break;

				case "milk-on-cereal":
					break;

				case "pizza":
					break;

				case "milk-in-a-hot-drink":
					break;

				default:
					console.error("Unexpected portion size method: " + portionSize.method);
					break;
			}

			return packedPortionSize;

		});
	};
	return instance;
}