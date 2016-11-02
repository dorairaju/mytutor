myApp.controller('signupController', ['$scope','$http', '$location', function ($scope, $http, $location) {
    $scope.value = 'Signup';

    	var newUser = {};

    $scope.signup = function() {
    	//alert("signup");
    	//var newUser = {};

    	newUser.username = $scope.email;
    	newUser.password = $scope.password;
    	newUser.firstname = $scope.fname;
    	newUser.middlename = ($scope.mname==undefined)?"":$scope.mname;
    	newUser.lastname = $scope.lname;
    	newUser.DOB = ($scope.dob==null)?'':($scope.dob.getMonth() + '-' +$scope.dob.getDate() +"-" +$scope.dob.getFullYear());

    	newUser.phoneNumber = $scope.number;

    	var signupEmpty = function(){

    		$scope.email = '';
    		$scope.password = '';
    		$scope.fname = '';
    		$scope.mname = '';
    		$scope.lname = '';
    		$scope.dob = '';
    		$scope.number ='';

    	};

    	//console.log(JSON.stringify(newUser));
     
    	$http.post('http://localhost:3000/users', JSON.stringify(newUser)).success(function(response) {
				//console.log(response);
				//refresh();
				//console.log(response);

				alert("Successfully signedup.");
			});
	 



    	//Emptying the input boxes in signup page
    	signupEmpty();

    	$location.path("/login");




    };

}]);
