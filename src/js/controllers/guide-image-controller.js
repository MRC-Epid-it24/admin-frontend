'use strict';

module.exports = function (app) {
    app.controller('GuideImageController', ['$scope', 'FoodDataReader', 'DrawersService', controllerFun]);
};

function controllerFun($scope, foodDataReader, DrawersService) {

    $scope.guideImages = null;

    $scope.isOpen = DrawersService.drawerGuideImage.getOpen();

    $scope.$on("intake24.admin.LoggedIn", function (event) {
        reloadGuideImages();
    });

    function reloadGuideImages() {
        foodDataReader.getGuideImages().then(function (guideImages) {
                $scope.guideImages = guideImages;
            },
            $scope.handleError);
    }

    $scope.setGuideImage = function (guide_image_id) {
        DrawersService.drawerGuideImage.setValue(guide_image_id);
        this.close();
    };

    $scope.close = function () {
        DrawersService.drawerGuideImage.close();
    };

    $scope.$watch(function () {
        return DrawersService.drawerGuideImage.getOpen();
    }, function () {
        $scope.isOpen = DrawersService.drawerGuideImage.getOpen();
    });
}
