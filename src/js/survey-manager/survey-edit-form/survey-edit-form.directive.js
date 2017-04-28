/**
 * Created by Tim Osadchiy on 19/03/2017.
 */

"use strict";

module.exports = function (app) {
    app.directive("surveyEditForm", ["LocalesService", "SurveyService", "UserStateService",
        "uiDatetimePickerConfig", directiveFun]);
};

function directiveFun(LocalesService, SurveyService, UserStateService, uiDatetimePickerConfig) {

    function controller(scope, element, attribute) {

        scope.form = {};

        scope.uiDatetimePickerConfig = uiDatetimePickerConfig;
        scope.surveyStateOptions = [
            {value: "0", text: "Has not started"},
            {value: "2", text: "Active"},
            {value: "1", text: "Suspended"}
        ];

        scope.loading = false;

        scope.formValidation = {
            name: true,
            supportEmail: true,
            surveyPeriod: true
        };

        scope.datePickerState = {
            startIsOpen: false,
            endIsOpen: false
        };

        scope.locales = [];

        scope.openStartDatePicker = function () {
            scope.datePickerState.startIsOpen = true;
        };

        scope.openEndDatePicker = function () {
            scope.datePickerState.endIsOpen = true;
        };

        scope.cancel = function () {
            updateScope(scope, scope.survey);
        };

        scope.save = function () {
            if (!validateForm(scope)) {
                return;
            }
            var def;
            scope.loading = true;
            if (!scope.survey) {
                def = SurveyService.create(getRequest(scope));
            } else {
                def = SurveyService.patch(scope.survey.id, getRequest(scope)).then(function (data) {
                    updateScope(scope, data);
                    updateSurvey(scope, data);
                    return data;
                });
            }
            def.then(function (data) {
                if (scope.onSaved) {
                    scope.onSaved(data);
                }
            }).finally(function () {
                scope.loading = false;
            });
        };

        scope.$watch(function () {
            return LocalesService.list();
        }, function () {
            scope.locales = LocalesService.list();
        });

        scope.$watch("survey", function (newVal) {
            updateScope(scope, newVal);
        });

        scope.$watch(function() { return UserStateService.getUserInfo(); }, function(newValue) {
            scope.currentUser = newValue;
        });

    }

    return {
        restrict: "E",
        scope: {
            survey: "=?",
            onSaved: "=?"
        },
        link: controller,
        template: require("./survey-edit-form.directive.html")
    }

}

function getRequest(scope) {
    return {
        id: scope.form.name,
        state: scope.form.state,
        startDate: scope.form.startDate.toISOString(),
        endDate: scope.form.endDate.toISOString(),
        schemeId: "default",
        localeId: scope.form.selectedLocale,
        allowGeneratedUsers: scope.form.allowGeneratedUsers,
        externalFollowUpURL: scope.form.externalFollowUpURL,
        supportEmail: scope.form.supportEmail
    };
}

function validateForm(scope) {

    scope.formValidation.name = scope.form.name.trim() != "";

    scope.formValidation.supportEmail = scope.form.supportEmail.trim() != "";

    scope.formValidation.surveyPeriod = scope.form.startDate != null &&
        scope.form.endDate != null &&
        scope.form.endDate >= scope.form.startDate;

    return scope.formValidation.name &&
        scope.formValidation.supportEmail &&
        scope.formValidation.surveyPeriod;

}

function updateScope(scope, data) {
    if (!data) {
        scope.form.name = "";
        scope.form.state = "0";
        scope.form.selectedLocale = "en_GB";
        scope.form.allowGeneratedUsers = false;
        scope.form.externalFollowUpUrl = "";
        scope.form.supportEmail = "";
        scope.form.startDate = null;
        scope.form.endDate = null;
    } else {
        scope.form.name = data.id;
        scope.form.state = String(data.state);
        scope.form.selectedLocale = data.localeId;
        scope.form.allowGeneratedUsers = data.allowGeneratedUsers;
        scope.form.externalFollowUpUrl = data.externalFollowUpURL;
        scope.form.supportEmail = data.supportEmail;
        scope.form.startDate = new Date(data.startDate);
        scope.form.endDate = new Date(data.endDate);
    }
}

function updateSurvey(scope, data) {
    scope.survey.id = data.id;
    scope.survey.state = data.state;
    scope.survey.localeId = data.localeId;
    scope.survey.allowGeneratedUsers = data.allowGeneratedUsers;
    scope.survey.externalFollowUpURL = data.externalFollowUpURL;
    scope.survey.supportEmail = data.supportEmail;
    scope.survey.startDate = data.startDate;
    scope.survey.endDate = data.endDate;
}
