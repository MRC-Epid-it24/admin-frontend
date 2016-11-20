/**
 * Created by Tim Osadchiy on 22/10/2016.
 */

'use strict';

var ImageModel = require("./image-model");

module.exports = function (app) {
    app.controller('ImageGalleryMain', ["$scope", "$timeout", "ImageService", controllerFun]);
};

function controllerFun($scope, $timeout, ImageService) {

    var LIMIT = 10,
        SEARCH_DELAY = 500;

    var page = 0,
        loadImagesTimeout;

    $scope.images = [];
    $scope.searchQuery = "";
    $scope.copiedTags = [];
    $scope.loadingImages = false;

    $scope.onFilesChange = function (fileList) {
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList.item(i);
            if (!file.type.match(/image.*/)) {
                continue;
            }
            var image = new ImageModel();
            image.loading = true;
            $scope.images.unshift(image);
            ImageService.add(file).then(function (data) {
                image.src = data.src;
                image.loading = false;
            }, function () {
                removeItem(image);
            });
        }
    };

    $scope.select = function (item) {
        item.selected = !item.selected;
    };

    $scope.selectAll = function () {
        $scope.images.forEach(function (image) {
            image.selected = true;
        });
    };

    $scope.deselectAll = function () {
        $scope.images.forEach(function (image) {
            image.selected = false;
        });
    };

    $scope.removeSelected = function () {
        // Fixme: You can't remove deleted images
        if (!confirm("Are you sure you want to delete selected images?")) {
            return;
        }
        $scope.images.forEach(function (image) {
            sendRemoveItemRequest(image);
        });
    };

    $scope.removeItem = function (image) {
        if (!confirm("Are you sure you want to delete this image?")) {
            return;
        }
        sendRemoveItemRequest(image);
    };

    $scope.copyTags = function (image) {
        $scope.copiedTags = image.tags.slice();
    };

    $scope.pasteTagsToSelected = function () {
        if ($scope.copiedTags != undefined && $scope.copiedTags.length > 0) {
            $scope.images.forEach(function (image) {
                image.tags = $scope.copiedTags.slice();
            });
        }
    };

    $scope.getImagesSelected = function () {
        return $scope.images.filter(function (image) {
                return image.selected;
            }).length > 0;
    };

    $scope.loadImages = function () {
        $timeout.cancel(loadImagesTimeout);
        $scope.loadingImages = true;
        loadImagesTimeout = $timeout(loadImages, SEARCH_DELAY);
    };

    $scope.$watch("searchQuery", function () {
        $scope.images.length = 0;
        page = 0;
        $scope.loadImages();
    });

    loadImages();

    function loadImages() {
        ImageService.query(page * LIMIT, LIMIT, $scope.searchQuery).then(function (data) {
            Array.prototype.push.apply($scope.images, data.map(function (image) {
                return new ImageModel(image.id, image.fixedSizeUrl, image.keywords);
            }));
            // Increment page only if data came. If the data length is 0, try to reload it next time
            if (data.length) {
                page++;
            }
        }).finally(function () {
            $scope.loadingImages = false;
        });
    }

    function sendRemoveItemRequest(image) {
        image.loading = true;
        ImageService.remove(image.id).then(function () {
            removeItem(image);
        }).finally(function () {
            image.loading = false;
        });
    }

    function removeItem(image) {
        var i = $scope.images.indexOf(image);
        $scope.images.splice(i, 1);
    }

}

