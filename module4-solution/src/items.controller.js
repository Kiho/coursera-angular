(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  // Version with resolving to 1 item based on $stateParams in route config
  ItemsController.$inject = ['$stateParams', 'items'];
  function ItemsController($stateParams, items) {
    var itemList = this;
    itemList.items = items;
  }

})();
