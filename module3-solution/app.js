(function(){
  'use strict'

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.notFound = function () {
      return !(list.items && list.items.length > 0)
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchText = "";
    menu.find = function () {
      MenuSearchService.getMatchedMenuItems(menu.searchText)
      .then(function (result) {
       menu.items = result;
      });
    }

    menu.removeItem = function (index) {
      MenuSearchService.removeItem(index);
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var items = [];

    function getItems() {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });
      return response;
    };

    service.getMatchedMenuItems = function (searchTerm) {
      return getItems().then(function (result) {
        if (!searchTerm || !searchTerm.trim()) {
          items = [];
        }
        else {
          searchTerm = searchTerm.toLowerCase();
          items = result.data.menu_items.filter(function (item) {
            return item.description.toLowerCase().indexOf(searchTerm) > -1;
          });
        }
        return items;
      })
    };

    service.removeItem = function (itemIndex) {
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };
  }
})();
