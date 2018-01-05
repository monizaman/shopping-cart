'use strict';



var services = angular.module('services',['ngResource']);

services.factory('ProductList', ['$resource',
	function($resource) {
		return $resource("./js/service.json", {}, {
			get: {method: 'GET', cache: false, isArray: true}            
		});
	}]);


services.factory('CartList',[
	function(){
		return {
		getTotalPrice : getTotalPrice,
		getTotalCount : getTotalCount,
		addItems : addItems
	};

	//add Items in the cart
	function addItems (sku,name,price,quantity){
		var obj = {
			sku : sku,
			name : name,
			price : price * 1,
			quantity : quantity
		};

		var items = [];
		items = JSON.parse(localStorage.getItem('AngularCartStore'));
		quantity = Number(quantity);
		if (quantity != 0) {
            // update quantity for existing item
            var found = false;
            for (var i = 0; i < items.length && !found; i++) {
                var item = items[i];
                if (item.sku == sku) {
                    found = true;
                    item.quantity = Number(item.quantity + quantity);
                    if (item.quantity > 0) {
                    	items[i] = item;
                    	localStorage.setItem('AngularCartStore', JSON.stringify(items));
                    }
                    if (item.quantity <= 0) {
                    	items.splice(i, 1);
                    	localStorage.setItem('AngularCartStore', JSON.stringify(items));
                    }
                }
            }
            // new item, add now
        	if (!found) {
            	items.push(obj);
           	    localStorage.setItem('AngularCartStore', JSON.stringify(items));
            }
        }
    };

	// get the total price for all items currently in the cart
	function getTotalPrice(){
		var items = [];
		items = JSON.parse(localStorage.getItem('AngularCartStore'));
		var total = 0;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			total += Number(item.quantity * item.price);
		}
		return total;
	};
	//get the total price for all items currently in the cart
	function getTotalCount (){
		var items = [];
		items = JSON.parse(localStorage.getItem('AngularCartStore'));
		var count = 0;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			count += Number(item.quantity);
		}
		return count;
	};

}]);