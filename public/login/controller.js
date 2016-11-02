myApp.controller('loginController', ['$scope','$location', 'loginService', '$http', '$cookies', function ($scope, $location, loginService, $http, $cookies) {
    $scope.value = 'Login';

	$scope.login = function() {

	    loginService.userData($scope.username).then(function(response){

	    	var userDB = response[0];

	    	//console.log(userDB);

	    	if( response[0] && $scope.username == response[0].username.toLowerCase())
	    	{
	    		//alert("You are in.");
	    		$location.path("/courses");

	    		$cookies.put('currentUser', JSON.stringify(userDB) );
	    	}
	    	else{
	    		alert("Authentication failed.");

	    		$scope.username = '';
	    		$scope.password = '';
	    	}



	    }, function(error){
	    	$scope.error = "Could not fetch the data.";
	    });

	}
    

  //   $http.get("http://localhost:3000/users/user1").then(function(response){
		// 	console.log(response.data);
		// });

    //console.log(typeof(loginService.getUser))

    //$scope.name = loginService.name;
    /*
    $scope.login = function() {

    	loginService.getUser('user1').then(function(data){
    		console.log(data);
    	}, function(error){
    		console.log(error);
    	});

    	alert($scope.username +" "+$scope.password);

    	$location.path("/home");


    } */
}]);
