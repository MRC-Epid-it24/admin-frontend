/* Controller responsible for the property editor on the right-hand side of
 * the page
 */

'use strict';

var _ = require('underscore');

module.exports = function (app) {
    app.controller('PropertiesController',
        ['$scope', '$rootScope', '$routeParams', 'CurrentItem', 'SharedData', 'FoodService',
            'UserFoodData', 'PackerService', '$q', 'MessageService',
            'LocalesService', 'UserStateService', controllerFun]);
};

function controllerFun($scope, $rootScope, $routeParams, currentItem, sharedData, FoodService,
                       userFoodData, PackerService, $q, MessageService, LocalesService, UserStateService) {

    $scope.sharedData = sharedData;

    $scope.locales = null;

    $scope.localesCollapsed = true;

    $scope.useInRecipesOptions = [{
        label: "Use anywhere",
        value: 0
    }, {
        label: "Use only as regular food",
        value: 1
    }, {
        label: "Use only as recipe ingredient",
        value: 2
    }];

    LocalesService.list().then((locales) => {
        $scope.locales = _.sortBy(locales, (l) => l.englishName);
    });

    $scope.$watch(function () {
        return $routeParams.locale;
    }, function (newValue) {
        $scope.currentLocale = newValue;
    });

    $scope.$watch(function () {
        return UserStateService.getUserInfo();
    }, function (newValue) {
        $scope.currentUser = newValue;
    });

    $scope.getLocaleInfo = function (localeId) {
        return LocalesService.getLocaleUnsafe(localeId);
    };

    $scope.$watchGroup(['currentItem', 'itemDefinition.main.localeRestrictions', 'currentUser', 'currentLocale'], function () {

        $scope.currentUserCanUpdateMainFields = false;
        $scope.currentUserCanUpdateLocalFields = false;

        if ($scope.itemDefinition && $scope.currentItem && $scope.currentItem.type == 'food') {
            $scope.currentUserCanUpdateMainFields = $scope.currentUser.canUpdateFoodMain($scope.itemDefinition.main.localeRestrictions);
            $scope.currentUserCanUpdateLocalFields = $scope.currentUser.canUpdateFoodLocal($scope.currentLocale);
        } else if ($scope.currentItem && $scope.currentItem.type == 'category') {
            $scope.currentUserCanUpdateMainFields = $scope.currentUser.canUpdateCategoryMain();
            $scope.currentUserCanUpdateLocalFields = $scope.currentUser.canUpdateCategoryLocal($scope.currentLocale);
        }
    });


    function clearData() {
        // A snapshot of the initial item definition.
        // Loaded from the server when the currentItem changes.
        // Used to determine if anything changed to avoid making unneeded API calls.
        $scope.originalItemDefinition = null;

        // Current state of the selected item's properties.
        // Loaded from the server when the currentItem changes,
        // then bound to page controls and can be edited.
        $scope.itemDefinition = null;

        // Local view of the current food/category in the current locale for debugging
        $scope.localFoodData = null;

        $scope.localFoodDataSources = null;

        $scope.localViewOpen = false;

        // Override disabled state for footer buttons, e.g. while the update async
        // request is pending
        $scope.forceDisabledButtons = false;

        // Used to select whether the new item actions are used or the update actions
        $scope.newItem = false;

        $scope.codeIsValid = false;
        $scope.codeIsInvalid = false;
        $scope.portionSizeIsValid = true;
    }

    clearData();


    // Currently selected item's header.
    // Used for reference and should not be changed in this controller.
    $scope.currentItem = null;

    // List of all food groups. Loaded once on controller instantiation.
    $scope.foodGroups = null;

    // List of all nutrient code tables. Loaded once on controller instantiation.
    $scope.nutrientCodeSection = {
        tables: null,
        dropDownOpened: false,
        filteredTables: function () {
            if (!$scope.itemDefinition) {
                return this.tables;
            }
            return _.filter(this.tables, function (item) {
                return $scope.itemDefinition.local.nutrientTableCodes[item.id] == undefined;
            });
        },
        toggleDropDown: function () {
            this.dropDownOpened = !this.dropDownOpened;
        },
        addTable: function (id) {
            this.dropDownOpened = false;
            $scope.itemDefinition.local.nutrientTableCodes[id] = "";
        },
        removeTable: function (id) {
            delete $scope.itemDefinition.local.nutrientTableCodes[id];
        },
        buttonDisabled: function () {
            return this.filteredTables().length == 0;
        }
    };

    $scope.notValid = function () {
        return $scope.codeIsInvalid ||
            !$scope.portionSizeIsValid ||
            $scope.itemDefinition.main.englishDescription === '' ||
            !checkNutrientCodes() ||
            $scope.currentItem.type === "food" &&
            $scope.itemDefinition.local.associatedFoods.filter(function (item) {
                return !item.foodOrCategory;
            }).length > 0 ||
            $scope.currentItem.type === "food" &&!$scope.validateFoodLocales()
    };

    $scope.$watch('itemDefinition.main.code', function () {
        if ($scope.itemDefinition == null) {
            return;
        }
        checkCode();
    });

    $scope.$on('intake24.admin.food_db.NewItemCreated', function (event, newItem, header, parentNode) {
        $scope.currentItem = header;
        $scope.originalItemDefinition = newItem;
        $scope.itemDefinition = angular.copy(newItem);
        $scope.itemDefinition.main.parentCategories = (parentNode.code == "$UNCAT") ? [] : [parentNode];
        $scope.newItem = true;
    });

    $scope.$on('intake24.admin.food_db.CurrentItemChanged', function (event, newItem) {
        // This is just the basic header received from the tree control
        // Editable data will be stored in itemDefinition
        $scope.currentItem = newItem;
        $scope.newItem = false;
        reloadData();
    });

    $scope.$on('intake24.admin.food_db.CurrentItemUpdated', function (event, updateEvent) {
        $scope.currentItem = updateEvent.header;

        reloadData().then(function () {
            if (updateEvent.newItem) {
                // Fixme: This is done to save local description for newly created items. Because of the event system (CurrentItemChanged, CurrentItemUpdated) $scope.itemDefinition.localDescription is replaced with empty values.
                //$scope.itemDefinition.localDescription = updateEvent.header.localDescription;
                //if ($scope.currentItem.type == 'category') {
                //    $scope.updateCategory();
                //} else if ($scope.currentItem.type == 'food') {
                //    $scope.updateFood();
                //}
            }
        });
    });

    $scope.$on("intake24.admin.LoggedIn", function (event) {
        reloadFoodGroups();
        reloadNutrientCodeTables();
    });

    reloadFoodGroups();
    reloadNutrientCodeTables();

    $scope.$watch("itemChanged()", function (newVal, oldVal) {
        currentItem.setChangedState(newVal);
    });

    $scope.useExclusivelyInThisLocale = function (use) {
        if (arguments.length == 1) {
            var newList = _.without($scope.itemDefinition.main.localeRestrictions, $routeParams.locale);
            if (use)
                newList.push($routeParams.locale);
            $scope.itemDefinition.main.localeRestrictions = newList;
        } else {
            if ($scope.itemDefinition)
                return _.contains($scope.itemDefinition.main.localeRestrictions, $routeParams.locale);
            else
                return false;
        }
    };


    function reloadData() {
        clearData();

        if ($scope.currentItem) {
            disableButtons();

            return $q.all([loadMainRecord(), loadLocalRecord()])
                .finally(function () {
                    enableButtons();
                    setTextDirection();
                });
        } else {
            setTextDirection();
            return $q.when(true);
        }
    }

    function loadMainRecord() {

        if ($scope.currentItem.type == 'category') {
            return FoodService.getCategoryDefinition($routeParams.locale, $scope.currentItem.code)
                .then(function (definition) {
                    $scope.itemDefinition = definition;
                    $scope.originalItemDefinition = angular.copy($scope.itemDefinition);
                });
        } else if ($scope.currentItem.type == 'food') {
            return FoodService.getFoodDefinition($routeParams.locale, $scope.currentItem.code)
                .then(function (definition) {
                    $scope.itemDefinition = definition;
                    $scope.originalItemDefinition = angular.copy($scope.itemDefinition);
                });
        }
    }

    function loadLocalRecord() {
        if ($scope.currentItem.type == 'food') {
            return userFoodData.getFoodDataWithSources($routeParams.locale, $scope.currentItem.code).then(
                function (data) {
                    $scope.localFoodData = data[0];
                    $scope.localFoodDataSources = data[1];
                },
                function (response) {
                    if (response.code == 404) {
                        // 404 is expected and means that local food data is not defined
                        $scope.localFoodData = null;
                    } // anything else is an error
                    else return $q.reject(response);
                });
        }
    }

    $scope.foodLocalesModel = function (localeId, value) {
        if ($scope.currentItem.type !== 'food')
            return undefined;

        if ($scope.itemDefinition == null)
            return undefined;

        const def = $scope.itemDefinition.main;

        if (angular.isDefined(value)) {
            let restrictions = _.filter(def.localeRestrictions, (id) => id !== localeId);
            if (value)
                restrictions.push(localeId);
            def.localeRestrictions = restrictions;
        } else {
            return _.contains(def.localeRestrictions, localeId);
        }
    }

    $scope.revertLocaleChangesEnabled = function () {
        return $scope.itemDefinition &&
            !_.isEqual($scope.itemDefinition.main.localeRestrictions.sort(), $scope.originalItemDefinition.main.localeRestrictions.sort());
    }

    $scope.revertLocaleChanges = function () {
        $scope.itemDefinition.main.localeRestrictions = _.clone($scope.originalItemDefinition.main.localeRestrictions);
    }

    $scope.useExclusivelyInCurrentLocale = function () {
        $scope.itemDefinition.main.localeRestrictions = [$scope.currentLocale];
    }

    $scope.doNotUseInCurrentLocale = function () {
        $scope.itemDefinition.main.localeRestrictions = _.filter($scope.itemDefinition.main.localeRestrictions,
            (localeId) => localeId != $scope.currentLocale);
    }

    $scope.validateFoodLocales = function () {
        if (!$scope.currentItem || ! $scope.itemDefinition)
            return undefined;

        if ($scope.currentItem.type !== 'food')
            return undefined;

        return $scope.itemDefinition.main.localeRestrictions.length > 0;
    }

    function reloadFoodGroups() {
        FoodService.getFoodGroups($routeParams.locale).then(function (groups) {
            $scope.foodGroups = groups;
        });
    }

    function reloadNutrientCodeTables() {
        FoodService.fetchNutrientTables().then(function (tables) {
            $scope.nutrientCodeSection.tables = tables;
        });
    }

    function exists(categoryList, categoryHeader) {
        for (var i = 0; i < categoryList.length; i++) {
            if (categoryList[i].code == categoryHeader.code)
                return true;
        }
        return false;
    }

    function checkCode() {
        var code = $scope.itemDefinition.main.code;

        if (code != "" && code == $scope.originalItemDefinition.main.code) {
            $scope.codeIsValid = false;
            $scope.codeIsInvalid = false;
            return;
        }
        if (code.length < 4 || code.length > 8) {
            $scope.codeIsValid = false;
            $scope.codeIsInvalid = true;
            return;
        }

        var deferred = ($scope.currentItem.type == 'food') ? FoodService.checkFoodCode(code) : FoodService.checkCategoryCode(code);

        deferred.then(
            function (codeValid) {
                $scope.codeIsValid = codeValid;
                $scope.codeIsInvalid = !codeValid;
            });
    }

    function disableButtons() {
        $scope.forceDisabledButtons = true;
    }

    function enableButtons() {
        $scope.forceDisabledButtons = false;
    }

    function checkNutrientCodes() {
        for (var i in $scope.itemDefinition.local.nutrientTableCodes) {
            var item = $scope.itemDefinition.local.nutrientTableCodes[i];
            if (item == null || item.trim() == "") {
                return false;
            }
        }
        return true;
    }

    $scope.categoryMainRecordChanged = function () {
        if ($scope.originalItemDefinition && $scope.itemDefinition) {
            var packedOriginalBasic = PackerService.packCategoryMainRecordUpdate($scope.originalItemDefinition.main);
            var packedCurrentBasic = PackerService.packCategoryMainRecordUpdate($scope.itemDefinition.main);
            return !angular.equals(packedOriginalBasic, packedCurrentBasic);
        } else {
            return false;
        }
    };

    $scope.categoryLocalRecordChanged = function () {
        if ($scope.originalItemDefinition && $scope.itemDefinition) {
            var packedOriginal = PackerService.packCategoryLocalRecordUpdate($scope.originalItemDefinition.local);
            var packedCurrent = PackerService.packCategoryLocalRecordUpdate($scope.itemDefinition.local);
            return !angular.equals(packedOriginal, packedCurrent);
        } else {
            return false;
        }
    };

    $scope.foodMainRecordChanged = function () {
        if ($scope.originalItemDefinition && $scope.itemDefinition) {
            var packedOriginalBasic = PackerService.packFoodMainRecordUpdate($scope.originalItemDefinition.main);
            var packedCurrentBasic = PackerService.packFoodMainRecordUpdate($scope.itemDefinition.main);
            return !angular.equals(packedOriginalBasic, packedCurrentBasic);
        } else
            return false;
    };

    $scope.loadLocalRecordChanged = function () {
        if ($scope.originalItemDefinition && $scope.itemDefinition) {
            var packedOriginalLocal = PackerService.packFoodLocalRecordUpdate($scope.originalItemDefinition.local);
            var packedCurrentLocal = PackerService.packFoodLocalRecordUpdate($scope.itemDefinition.local);
            return !angular.equals(packedOriginalLocal, packedCurrentLocal);
        } else
            return false;
    };

    $scope.foodChanged = function () {
        return $scope.foodMainRecordChanged() || $scope.loadLocalRecordChanged();
    };

    $scope.categoryChanged = function () {
        return $scope.categoryMainRecordChanged() || $scope.categoryLocalRecordChanged();
    };

    $scope.itemChanged = function () {
        if ($scope.newItem)
            return false;
        else if ($scope.currentItem) {
            if ($scope.currentItem.type == 'food')
                return $scope.foodChanged();
            else if ($scope.currentItem.type == 'category')
                return $scope.categoryChanged();
        } else
            return false;
    };

    $scope.localDescriptionModel = function (description) {
        if (arguments.length == 1) {
            if (description.length > 0) {
                $scope.itemDefinition.local.localDescription.defined = true;
                $scope.itemDefinition.local.localDescription.value = description;
            } else {
                $scope.itemDefinition.local.localDescription.defined = false;
                $scope.itemDefinition.local.localDescription.value = null;
            }
        } else {
            if ($scope.itemDefinition != null && $scope.itemDefinition.local.localDescription.defined)
                return $scope.itemDefinition.local.localDescription.value;
            else
                return "";
        }
    };

    $scope.updateCategory = function () {
        disableButtons();

        updateCategoryMainRecord()
            .then(function () {
                return updateCategoryLocalRecord();
            })
            .then(
                function () {
                    MessageService.showMessage(gettext('Category updated'), 'success');
                    notifyItemUpdated();
                },
                function (response) {
                    MessageService.showMessage(gettext('Failed to update category'), 'danger');
                    // Check if this was caused by a 409, and show a better message
                    console.error(response);

                    notifyItemUpdated();
                });
    };

    function setTextDirection() {
        LocalesService.getLocale($routeParams.locale).then(function (locale) {
            $scope.formTextDirection = locale.textDirection;

            if ($scope.currentItem && $scope.currentItem.localDescription &&
                $scope.currentItem.localDescription.defined) {
                $scope.localeTextDirection = locale.textDirection;
            } else {
                $scope.localeTextDirection = "";
            }
        });
    }

    function createUpdateEvent() {
        return {
            header: {
                type: $scope.currentItem.type,
                code: $scope.itemDefinition.main.code,
                englishDescription: $scope.itemDefinition.main.englishDescription,
                localDescription: $scope.itemDefinition.local.localDescription,
                excludedFromThisLocale: $scope.itemDefinition.local.excludedFromThisLocale,
                displayName: $scope.itemDefinition.local.localDescription.defined ? $scope.itemDefinition.local.localDescription.value : $scope.itemDefinition.main.englishDescription
            },
            originalCode: $scope.originalItemDefinition.main.code,
            parentCategories: _.map($scope.itemDefinition.main.parentCategories, function (cat) {
                return cat.code;
            }),
        };
    }

    function notifyItemUpdated() {
        var updateEvent = createUpdateEvent();
        updateEvent.newItem = $scope.newItem;
        currentItem.itemUpdated(updateEvent);
    }

// These functions return a future/promise/deferred (see https://docs.angularjs.org/api/ng/service/$q)
// that will generate an async HTTP request to update the basic/local food
// record if required.
// Will return a dummy 'true' value if no changes are detected.
// Resulting value is not important, but HTTP errors must be handled further.

    function updateFoodMainRecord() {
        if ($scope.foodMainRecordChanged()) {
            return FoodService.updateFoodMainRecord($scope.originalItemDefinition.main.code, $scope.itemDefinition.main);
        } else {
            return $q.when(true);
        }
    }

    function updateFoodLocalRecord() {
        if ($scope.loadLocalRecordChanged()) {
            return FoodService.updateFoodLocalRecord($routeParams.locale,
                $scope.itemDefinition.main.code, $scope.itemDefinition.local);
        } else {
            return $q.when(true);
        }
    }

    function updateCategoryMainRecord() {
        if ($scope.categoryMainRecordChanged()) {
            return FoodService.updateCategoryMainRecord($scope.originalItemDefinition.main.code, $scope.itemDefinition.main)
        } else {
            return $q.when(true);
        }
    }

    function updateCategoryLocalRecord() {
        if ($scope.categoryLocalRecordChanged()) {
            return FoodService.updateCategoryLocalRecord($routeParams.locale,
                $scope.itemDefinition.main.code, $scope.itemDefinition.local);
        } else {
            return $q.when(true);
        }
    }

    $scope.updateFood = function () {
        disableButtons();

        updateFoodMainRecord()
            .then(function () {
                return updateFoodLocalRecord();
            })
            .then(
                function () {
                    MessageService.showMessage(gettext('Food updated'), 'success');
                    notifyItemUpdated();
                },
                function (response) {
                    MessageService.showMessage(gettext('Failed to update food'), 'danger');
                    // Check if this was caused by a 409, and show a better message
                    console.error(response);

                    reloadData();
                });
    };

    $scope.discardChanges = function () {
        reloadData();
        MessageService.showMessage(gettext('Changes discarded'), 'success');
    };

    $scope.saveNewFood = function () {
        FoodService.createNewFood($scope.itemDefinition)
            .then(function () {

                FoodService.addFoodToLocale($scope.currentLocale, $scope.itemDefinition.main.code)
                    .then(function () {
                        MessageService.showMessage(gettext('New food added'), 'success');
                        notifyItemUpdated();
                    });
            }, function (response) {
                MessageService.showMessage(gettext('Failed to add new food'), 'danger');
                // Check if this was caused by a 409, and show a better message
                console.error(response);
            });
    };

    $scope.saveNewLocalFood = function () {
        FoodService.createNewLocalFood($scope.currentLocale, $scope.itemDefinition)
            .then(function () {
                FoodService.addFoodToLocale($scope.currentLocale, $scope.itemDefinition.main.code)
                    .then(function () {
                        MessageService.showMessage(gettext('New food added'), 'success');
                        notifyItemUpdated();
                    });
            }, function (response) {
                MessageService.showMessage(gettext('Failed to add new food'), 'danger');
                // Check if this was caused by a 409, and show a better message
                console.error(response);
            });
    };

    $scope.cancelNewFood = function () {
        currentItem.setCurrentItem(null);
    };

    $scope.saveNewCategory = function () {
        FoodService.createNewCategory($scope.itemDefinition)
            .then(function () {
                MessageService.showMessage(gettext('New category added'), 'success');
                notifyItemUpdated();
            }, function (response) {
                MessageService.showMessage(gettext('Failed to add new category'), 'danger');
                // Check if this was caused by a 409, and show a better message
                console.error(response);
            });
    };

    $scope.cancelNewCategory = function () {
        currentItem.setCurrentItem(null);
    };

    $scope.deleteItem = function () {
        currentItem.delete();
    };

    $scope.cloneFood = function () {
        $rootScope.$broadcast('intake24.admin.food_db.CloneFood');
    };

    $scope.cloneFoodAsLocal = function () {
        $rootScope.$broadcast('intake24.admin.food_db.CloneFoodAsLocal');
    };
}
