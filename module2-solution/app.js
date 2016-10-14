(function(){
  'use strict'

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();
    toBuy.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "chips", quantity: 15 },
      { name: "flour", quantity: 5 },
      { name: "sugar", quantity: 8 },
      { name: "eggs", quantity: 20 }
    ];
    var boughtItems = [];

    service.buyItem = function (index) {
      boughtItems.push(toBuyItems[index]);
      service.removeToBuyItem(index);
    };

    service.removeToBuyItem = function (index) {
      toBuyItems.splice(index, 1);
    };

    service.getAlreadyBoughtItems = function () {
      return boughtItems;
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };
  }

})();
