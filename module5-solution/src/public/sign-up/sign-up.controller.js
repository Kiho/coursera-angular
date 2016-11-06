(function () {

angular.module('public')
.controller('SignUpController', SignUpController)
.factory('ValidMenuItem', ValidMenuItem)
.directive('favoriteDish', FavoriteDish);

FavoriteDish.$inject = ['ValidMenuItem'];
function FavoriteDish (ValidMenuItem) {
  var ddo = {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.favorite = ValidMenuItem;
    }
  };
  return ddo;
}

ValidMenuItem.$inject = ['$q', 'MenuService'];
function ValidMenuItem($q, MenuService){
  return function(shortName) {
    var deferred = $q.defer();

    MenuService.getMenuItemByShorName(shortName).then(function(res) {
      if(res)
        deferred.resolve();
      else
        deferred.reject();
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  }
}

SignUpController.$inject = ['FormService', 'MenuService'];
function SignUpController(FormService, MenuService) {
  var signUp = this;

  signUp.submit = function () {
    signUp.completed = true;
    FormService.saveUser(signUp.user);
  };
}

})();
