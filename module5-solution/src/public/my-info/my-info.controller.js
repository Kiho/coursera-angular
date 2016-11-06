(function () {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['FormService', 'MenuService'];
function MyInfoController(FormService, MenuService) {
  var myInfo = this;

  myInfo.user = FormService.getUser();
  myInfo.favoriteDish = null;

  myInfo.getFavoriteDish = function() {
    if (myInfo.user.favoriteDish != myInfo.favoriteDish) {
      MenuService.getMenuItemByShorName(myInfo.user.favoriteDish)
      .then(function (result) {
        myInfo.favoriteMenuItem = result;
      });
      myInfo.favoriteDish = myInfo.user.favoriteDish;
    }
    return myInfo.favoriteMenuItem
  }
}

})();
