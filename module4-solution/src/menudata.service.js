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

    function getData(query) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + query)
      });
      return response;
    };

    service.getAllCategories = function () {
      return getData("/categories.json").then(function (result) {
        categories = result.data;
        return categories;
      })
    };

    service.getItemsForCategory = function (categoryShortName) {
      if (categoryShortName == undefined) categoryShortName = '';
      var query = "/menu_items.json?category=" + categoryShortName;
      return getData(query).then(function (result) {
        items = result.data.menu_items;
        return items;
      })
    };
  }

})();
