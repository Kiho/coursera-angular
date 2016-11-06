(function () {
"use strict";

angular.module('common')
.service('FormService', FormService);

function FormService() {
  var service = this;
  var userData;

  service.getUser = function () {
    return userData;
  };

  service.saveUser = function (user) {
    userData = user;
  };
}

})();
