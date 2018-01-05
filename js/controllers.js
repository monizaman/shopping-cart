'use strict';

var shoppingCart = angular.module('shoppingCart',[]);

shoppingCart.controller('ProductListCtrl',['$scope','ProductList','CartList','$location',
	function ProductListCtrl ($scope,ProductList,CartList,$location) {
        ProductList.get({},
            function success(response) {
                $scope.productsList = response;
            },
            function error(errorResponse) {
            }
        );

        $scope.viewDetails = function (userId) {
            $location.path('/product-detail/' + userId);
        };

        var items = [];
        if (localStorage.AngularCartStore == null) {
            localStorage.setItem('AngularCartStore', JSON.stringify(items));
        };

        //add Items in the cart
        $scope.addItems = function (sku,name,price,quantity){     
            CartList.addItems(sku,name,price,quantity);
        };

        // get the total price for all items currently in the cart
        $scope.getTotalPrice = function () {
            return CartList.getTotalPrice();
        };

        //get the total price for all items currently in the cart
        $scope.getTotalCount = function () {
            return CartList.getTotalCount();
        };


    }]);

shoppingCart.controller('ProductDetailCtrl',['$scope','ProductList','CartList','$routeParams','$location',
	function ProductDetailCtrl($scope,ProductList,CartList,$routeParams,$location){
         ProductList.get({},
            function success(response) {
                $scope.productsList = response;
                // Filter product by route parameter
                $scope.product = response.filter(function (obj) {
                      if(obj["sku"] !== $scope.productId) {
                        return false;
                      }
                    return true;
                  });   
            },
            //$scope.product = $scope.product[0];
            function error(errorResponse) {
            }
        );

         //add Items in the cart
        $scope.addItems = function (sku,name,price,quantity){     
            CartList.addItems(sku,name,price,quantity);
        };

        // get the total price for all items currently in the cart
        $scope.getTotalPrice = function () {
            return CartList.getTotalPrice();
        };

        //get the total price for all items currently in the cart
        $scope.getTotalCount = function () {
            return CartList.getTotalCount();
        };
        //Get Route Parameter 
        $scope.productId = $routeParams.id;

        $scope.dvaCaption = [
        "Negligible",
        "Low",
        "Average",
        "Good",
        "Great"
        ];
        $scope.dvaRange = [
            "below 5%",
            "between 5 and 10%",
            "between 10 and 20%",
            "between 20 and 40%",
            "above 40%"
        ];
        
	}]);


shoppingCart.controller('StoreController',['$scope','ProductList','CartList','$routeParams','$location',
    function StoreController($scope,ProductList,CartList,$routeParams,$location){

        $scope.items = [];
        $scope.items = JSON.parse(localStorage.getItem('AngularCartStore'));

        //add Items in the cart
        $scope.addItems = function (sku,name,price,quantity){     
            CartList.addItems(sku,name,price,quantity);
            $scope.items = JSON.parse(localStorage.getItem('AngularCartStore'));
        };

        // get the total price for all items currently in the cart
        $scope.getTotalPrice = function () {
            return CartList.getTotalPrice();
        };

        //get the total price for all items currently in the cart
        $scope.getTotalCount = function () {
            return CartList.getTotalCount();
        };
        //clear all cart Items from cart
        $scope.clearItems = function () {
            $scope.items = [];
            localStorage.setItem('AngularCartStore', JSON.stringify($scope.items));
        };
        
    }]);
