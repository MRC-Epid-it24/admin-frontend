angular.module('intake24.admin.food_db').factory('Problems', ['$http', 'SharedData', function($http, sharedData) {
	return {
		getCategoryProblemsRecursive: function(code, onSuccess, onFailure)
		{
			$http({
					method: 'GET',
					url: api_base_url + 'admin/categories/' + sharedData.locale.intake_locale + '/' + code + '/problems/recursive',
					headers: { 'X-Auth-Token': Cookies.get('auth-token') }
				}).then(function (response) {
					onSuccess(response.data);
				}, function (response) { onFailure(response); });
		},

		getFoodProblems: function(code, onSuccess, onFailure)
		{
			$http({
					method: 'GET',
					url: api_base_url + 'admin/foods/' + sharedData.locale.intake_locale + '/' + code + '/problems',
					headers: { 'X-Auth-Token': Cookies.get('auth-token') }
				}).then(function (response) {
					onSuccess(response.data);
				}, function (response) { onError(response); });
		}
	};
}]);
