myApp.controller('loginController', ['$scope', '$location', function ($scope, $location) {
    $scope.value = 'Login';

    $scope.login = function() {

    	alert($scope.username +" "+$scope.password);

    	$location.path("/home");


    }
}]);
