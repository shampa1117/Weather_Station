
	var wfApp = angular.module('wfApp', []);
	
	var gmapAPI = wfApp.factory("gmapAPI", ["$http", "$q", function($http, $q){
		var appServices = {
			fetchWebForcast: fetchWebForcast
		};
		
		var cityjson = { 
			"toranto": "2w9nb",
			"london": "2yet3",
			"california": "4tqf3",
			"newyork": "pucf",
			"washington": "1df3z"
		
		};
		
		function fetchWebForcast(city){
			var d = $q.defer();
			var key = cityjson[city.toLowerCase()] ? cityjson[city.toLowerCase()] : "3kq1r";
			  $http.get('https://api.myjson.com/bins/'+key).success(function(data){
				d.resolve(data);
			});
			return d.promise;
		}
		
		return appServices
	}]);

    var appController = wfApp.controller('appController', [ 'gmapAPI', '$scope',function (gmapAPI, $scope) {
		this.searched = []
		$scope.forcasts = [];
		var ctrl = this;
		this.ttile ="qweqwe";
		$scope.fetchDetails = function(city){
			gmapAPI.fetchWebForcast(city).then(function(data){
			
					ctrl.selectedCity = data;
					
			})
		}
		
			
		$scope.getWeatherForcast = function(){
			var city = $scope.city;
			ctrl.searched.push(city);
			$scope.fetchDetails(city);
		}
		$scope.fetchDetails("default");
	}]);

