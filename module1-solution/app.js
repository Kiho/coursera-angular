(function(){
  'use strict'

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.inject = ['$scope'];
  function LunchCheckController($scope){

    $scope.lunchMenu = '';
    $scope.message = '';
    $scope.messageStyle = null;
    $scope.textBorderStyle = null;

    $scope.sayMessage = function () {
      var count = countItems($scope.lunchMenu);
      $scope.message = getMessage(count);
      $scope.messageStyle = {'color': getColor(count)};
      $scope.textBorderStyle = {'borderColor': getColor(count)};
    };

    var checkNotEmpty = function(item) {
        return item && item.trim();
    }

    var countItems = function(menuItems) {
        return menuItems.split(',').filter(checkNotEmpty).length;
    };

    var getMessage = function(count) {
      if (count > 3) {
        return 'Too much!';
      }
      if (count > 0) {
        return 'Enjoy!';
      }
      return 'Please enter data first';
    }

    var getColor = function (count) {
      if (count > 0) {
        return 'green';
      }
      return 'red';
    }
  }
})();
