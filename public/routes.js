myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('login', {
			url: '/login',
			templateUrl: 'login/login.html',
			controller: 'loginController'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'signup/signup.html',
			controller: 'signupController'
		})
		.state('courses', {
			url: '/courses',
			templateUrl: '/courses/courses.html',
			controller: 'coursesController'
		})
		.state('addCourse', {
			url: '/addCourse',
			templateUrl: '/courses/addCourse.html',
			controller: 'coursesController'
		})
		.state('courseTopics', {
			url: '/courseTopics',
			templateUrl: '/courses/courseTopics.html',
			controller: 'topicsController'
		})
        .state('regCourses', {
            url: '/regCourses',
            templateUrl: '/courses/regCourses.html',
            controller: 'regCoursesController'
        });

}]);


myApp.run(['$rootScope', '$cookies', '$location', function ($rootScope, $cookies, $location) {

	$rootScope.showLogin = true;
	$rootScope.showSignup = true;

	$rootScope.logout = function () {

        $cookies.remove('currentUser');
        $location.path('/login');

    }

    $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {
        console.log(toState.name);


       	var loggedInUser = $cookies.get('currentUser');

       	if (toState.name === 'login' || toState.name === 'signup') {
            $rootScope.showLogout = false;
                $rootScope.showSignup = true;
                $rootScope.showLogin = true;
        } else {
                $rootScope.showLogout = true;
                $rootScope.showSignup = false;
                $rootScope.showLogin = false;

            $rootScope.message = null;
            if (loggedInUser === undefined) {
                event.preventDefault();
                $rootScope.showLogout = false;
                $rootScope.showSignup = true;
                $rootScope.showLogin = true;
                $location.path('/login');
            }
        }

       	// if (toState.name === 'login' || toState.name === 'signup') {
       	// 	    //alert("Hii");
        //     	$rootScope.showLogout = false;
        //     	$rootScope.showLogin = true;
        //         $rootScope.showSignup = true;
        // } else if (loggedInUser === undefined) {
        		
        // 		event.preventDefault();
        // 		$location.path('/login');

        //         $rootScope.showLogout = false;
            
        // } else {
        //         $rootScope.showLogout = true;
        //         $rootScope.showLogin = false;
        //         $rootScope.showSignup = false;        	
        // }





       	//alert("hii your state is changing..");

    });
}]);