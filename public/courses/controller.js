myApp.controller('coursesController', ['$scope', '$location', '$cookies', '$http', 'courseService',
 function ($scope, $location, $cookies, $http, courseService) {
    

var user =JSON.parse($cookies.get('currentUser'));

courseService.setCurrentUser(user);

//console.log("user info"+user._id);

  $scope.courses = null;
  var createNewTopic = function () {
        return {
            name: '',
            duration: ''
        }
    };
    $scope.course = {
        name: '',
        skillLevel: 'BEGINNER',
        description: '',
        prereqs: '',
        fee: '',
        endGoal: '',
        courseType: 'Free',
        topicDetails: [createNewTopic(), createNewTopic()],
        autherFullname: '',
    };


/*Getting all the courses based on the user data that we retrieved from the cookies*/

(function() {

	  //var courses = $http.get("http://localhost:3000/courses")
    var courses = $http.get("/courses")
	  .then(function(response) {
      
      $scope.courses = response.data;

      //console.log(response);
  });


}());
/*Getting courses based on the user data that we retrieved from the cookies*/
/*********************Ends here***************/




/* Adding courses to the user */
(function(){

 //********//

      $scope.addCourseMsg = "Add Course";

     $scope.addNewTopic = function() {
        $scope.course.topicDetails.push(createNewTopic());
     }

     $scope.removeTopic = function(topic) {
     	  $scope.course.topicDetails.pop(topic);
     }
  

  ///////************* Testing code starts here **************///////
        var coursesDb = $http.get("/courses")
      .then(function(response) {
      
          return response.data;
      });

      _.each(coursesDb, function(eachCourse) {
        console.log(eachCourse);
            //if( eachCourse.name.toLowerCase() == $scope.course.name.toLowerCase()) {alert("Course name is already there.");} 
        });
  ///////************* Testing code ends here **************///////
	 $scope.saveCourse = function() {

	 	var newCourse = $scope.course;
	 		newCourse.autherFullname = user.firstname + ' ' +user.lastname;
	 		newCourse.userId = user._id;

	   //$http.post('http://localhost:3000/courses', JSON.stringify(newCourse)).success(function(response) {
		$http.post('/courses', JSON.stringify(newCourse)).success(function(response) {		
		 $scope.courses.push(response);

			});


	     //console.log($scope.courses);

	     $location.path("/courses");

  	}


}());
/* Adding courses ended here */

/* Showing topics in Course Topics page */
(function() {

	//var courseSelected = {};
	$scope.displayTopics = function(course) {

		courseService.setSelectedCourse(course);

		//console.log(course);
		$location.path("/courseTopics/"+course._id);

	};

}());


/* Storing registered courses of the user in courses service */

(function(){

  $scope.regCourses = function(courses) {
    //console.log(courses);
    //console.log(user.regCourses);

    var regCourseids = [];

    _.each(user.regCourses, function(regCourse) {
        regCourseids.push(regCourse.courseid);
    });

    var regCourses = [];
    
    _.each(courses, function(course) {
        _.each(regCourseids, function(regid){
            if(course._id === regid) regCourses.push(course);
        });
    });

    courseService.setRegCourses(regCourses);
    $location.path("/regCourses");
  }

}());

 
}]);


myApp.controller("topicsController",['$scope', 'courseService', '$location', '$http', '$cookies', 'loginService', function($scope, courseService, $location, $http, $cookies, loginService){


  $scope.selectedCourse = courseService.selectedCourse;

  var user = courseService.currentUser;

  var currentUserId =  courseService.currentUser._id;

  var regCourseids = [];

  _.each(courseService.currentUser.regCourses, function(regCourse) {
    regCourseids.push(regCourse.courseid);
  });

  //console.log(regCourseids.toString().indexOf(courseService.selectedCourse._id) == -1);

  if( regCourseids.toString().indexOf(courseService.selectedCourse._id) == -1) {

    $scope.showRegbtn = false;

  }
  else {
    $scope.showRegbtn = true;
  }


  /***********************This function is to register the course and add that to the user database*****************/

  (function(){

    $scope.register = function() {


          //Adding registered course id starts here
          regCourseids.push(courseService.selectedCourse._id);


          var courseIdsArray = [];

          _.each(regCourseids, function(regCourseid) {

            courseIdsArray.push({"courseid": regCourseid});

          });

          var courseIdsObject = {regCourses: courseIdsArray};

      
          $http.put('/users/'+ currentUserId, JSON.stringify(courseIdsObject)).success(function(response) {
              alert("Registered courses updated.");
              //console.log(response);
          });


/*  Regreshing user data in the cookies starts here*/
        loginService.userData(courseService.currentUser.username).then(function(response){

        var userDB = response[0];

        $cookies.put('currentUser', JSON.stringify(userDB) );

        //console.log(userDB);

        });

/*  Regreshing user data in the cookies ends here*/
    

    


    }

  }());

}]);

myApp.controller("regCoursesController",['$scope', 'courseService', '$location', function($scope, courseService, $location){

  $scope.regCourses = courseService.regCourses;

  /* Showing topics in Course Topics page */
    (function() {

      //var courseSelected = {};
      $scope.displayTopics = function(course) {

        courseService.setSelectedCourse(course);

        //console.log(course);
        $location.path("/courseTopics/"+course._id);

      };

    }());

}]);


