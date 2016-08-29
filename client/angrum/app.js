var module = angular.module('angrum', []);

module.service('angModel', function($http) {

    this.getStories = function() {
        return $http({method:'get', url:'server/stories.json'}).then(
            function success(data) {
                return data;
            }, 
            function error(response) {
                //return response;
            }
        );
    }
});


module.factory('angViewUtil', function() {
    return {
        title: function(title) {
            return title.charAt(0).toUpperCase() + title.slice(1);
        },
    }
});

module.directive('storySidebar', function() {
    return {
        templateUrl: 'client/angrum/templates/story-sidebar.html'
    }
});

module.directive('storyDetail', function() {
    return {
        templateUrl: 'client/angrum/templates/story-detail.html'
    }
});

module.directive('storyEdit', function() {
    return {
        templateUrl: 'client/angrum/templates/story-edit.html'
    }
});

module.controller('angCtrl', function($scope, angModel, angViewUtil) {
    var ang = this;

    ang.title = 'AngRUM';

    $scope.views       = ['detail', 'edit', 'delete'];
    //$scope.currentView = $scope.views[0];
    //$scope.currentView = 'edit';

    $scope.viewUtil    = angViewUtil;

    ang.setScope = function(scopeVar, scopeValue) {
        $scope[scopeVar] = scopeValue;
    };

    angModel.getStories().then(function(d) {
            ang.stories = d.data;
        }
    );
    ang.setStory = function(story) {
        ang.currentStory = story;
        ang.setScope('currentView', 'detail');
    }

});

