(function () {

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'src/home.html'
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories.html',
      controller: 'MenuCategoriesController as mainList',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/items.html',
      controller: 'ItemsController as itemList',
      resolve: {
        items: ['$stateParams', 'MenuDataService',
                function ($stateParams, MenuDataService) {
                  return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
      },
      params: {
        categoryShortName: null
      }
    });
}

})();
