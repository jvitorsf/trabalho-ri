var app = angular.module('app',[]);

app.controller('appController',function ($scope,$http){
	$scope.results = Array();


	$scope.buscar = function(){
		$scope.req = $http.get('http://google.fr');
		$http.get("http://127.0.0.1:8080/search?query="+$scope.query)
		.success(function(data, status, headers, config) {
			$scope.results = data.bing;
			console.log($scope.results);
		})
		.error(function(data, status, headers, config) {
			alert("Error...");
			console.log(data);
		});
	}
});