(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  // Version with resolving to 1 item based on $stateParams in route config
  ItemsController.$inject = ['$stateParams', 'MenuDataService'];
  function ItemsController($stateParams, MenuDataService) {
    var itemList = this;
    MenuDataService.getItemsForCategory($stateParams.shortName)
      .then(function (result) {
        itemList.items = result;
      });
  }

})();
