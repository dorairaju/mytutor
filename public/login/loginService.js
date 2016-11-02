myApp.service('loginService', ['$http', function ($http) {


	this.userData = function(username) {

		//alert(username);

		return $http.get("http://localhost:3000/users/"+username).then(function(response){
			//console.log(response.data);
			return response.data;
		}, function(error){
			return error;
		});

	};

}]);
