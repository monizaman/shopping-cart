'use strict';

var cartApp = angular.module('cartApp',[
	'ngRoute',
	'shoppingCart',
	'services'
	]);

cartApp.config(['$routeProvider','$locationProvider',
	function($routeProvider,$locationProvider) {
		$routeProvider.
			when('/product-list',{
				templateUrl: 'partials/product-list.html',
				controller:  'ProductListCtrl'
			}).when('/product-detail/:id', {
				templateUrl: 'partials/product-detail.html', 
				controller: 'ProductDetailCtrl'
			}).when('/cart', {
		        templateUrl: 'partials/shoppingCart.html',
		        controller: 'StoreController'
		      }).otherwise({
				redirectTo: '/product-list'
			});
			//$routeProvider.otherwise({redirectTo: '/user-list'});
		$locationProvider.html5Mode(false).hashPrefix('!');
}]);