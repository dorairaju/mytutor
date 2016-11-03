myApp.service('loginService', ['$http', function ($http) {


	this.userData = function(username) {

		//alert(username);

		return $http.get("/users/"+username).then(function(response){
			return response.data;
		}, function(error){
			return error;
		});

	};

}]);
