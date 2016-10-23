(function () {
  'use strict';

  angular.module('Data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$q', '$http', 'ApiBasePath']
  function MenuDataService($q, $http, ApiBasePath) {
    var service = this;
    var items = [];
    var categories = [];

    function getCategories() {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });
      return response;
    };

    function getItems(searchTerm) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + searchTerm)
      });
      return response;
    };

    service.getAllCategories = function () {
      return getCategories().then(function (result) {
        categories = result.data;
        return categories;
      })
    };

    service.getItemsForCategory = function (categoryShortName) {
      return getItems(categoryShortName).then(function (result) {
        items = result.data.menu_items;
        return items;
      })
    };
  }

})();
