var module = angular.module('angrum', []);

module.service('angModel', function($http) {

    this.cached = [];

    this.getData = function(url, cached) {
        
        if (typeof cached == 'undefined' && typeof cached != 'boolean') {
            cached = false;
        }
        return $http({method:'get', url:url, cache:cached}).then(
            function success(data) {
                return data;
            }, 
            function error(response) {
                //return response;
                //TODO
            }
        );
    };

});


module.factory('angViewUtil', function(angModel) {
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

    angModel.getData('server/stories.json').then(function(d) {
            ang.stories = d.data;
        }
    );

    $scope.fieldMap = {};
    angModel.getData('server/stories.fieldmap.json', true).then(function(d) {
            $scope.fieldMap = d.data;
        }
    );

    ang.setStory = function(story) {
        ang.currentStory = story;
        ang.setScope('currentView', 'detail');
    }

});

