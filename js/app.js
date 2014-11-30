var wReader = angular.module('wReader', ['wReader.filters', 'wReader.services', 'wReader.directives', 'wReader.ngRoute', 'wReader.ngAnimate']);

  



function AppController($scope, items, scroll) {

  $scope.items = items;

  $scope.refresh = function() {
    items.getItemsFromServer();
    items.selectItem(0);
  };

  $scope.handleSpace = function() {
    if (!scroll.pageDown()) {
      items.next();
    }
  };

  $scope.$watch('items.selectedIdx', function(newVal, oldVal, scope) {
    if (newVal !== null) scroll.toCurrent();
  });
}

AppController.$inject = ['$scope', 'items', 'scroll']; // For JS compilers.


// Top Menu/Nav Bar
function NavBarController($scope, items) {

  $scope.showAll = function() {
    items.clearFilter();
    items.selectItem(0);
  };

  $scope.showUnread = function() {
    items.filterBy('read', false);
    items.selectItem(0);
  };

  $scope.showStarred = function() {
    items.filterBy('starred', true);
    items.selectItem(0);
  };

  $scope.showRead = function() {
    items.filterBy('read', true);
    items.selectItem(0);
  };
}

NavBarController.$inject = ['$scope', 'items'];  // For JS compilers.



document.addEventListener('DOMContentLoaded', function(e) {
  //On mobile devices, hide the address bar
  window.scrollTo(0,0);
}, false);



