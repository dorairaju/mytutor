myApp.controller('coursesController', ['$scope', '$location', '$cookies', '$http', 'courseService',
 function ($scope, $location, $cookies, $http, courseService) {
    

var user =JSON.parse($cookies.get('currentUser'));

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


/*Getting courses based on the user data that we retrieved from the cookies*/

(function() {

	  var courses = $http.get("http://localhost:3000/coursesID/"+user._id)
	  .then(function(response) {
      
      $scope.courses = response.data;

      //console.log(response);
  });


}());


/* Adding courses to the user */
(function(){
      $scope.addCourseMsg = "Add Course";

     $scope.addNewTopic = function() {
        $scope.course.topicDetails.push(createNewTopic());
     }

     $scope.removeTopic = function(topic) {
     	$scope.course.topicDetails.pop(topic);
     }
  

	 $scope.saveCourse = function() {

	 	var newCourse = $scope.course;
	 		newCourse.autherFullname = user.firstname + ' ' +user.lastname;
	 		newCourse.userId = user._id;
	 	    //console.log(newCourse);
	     //alert("Save Course.");

	         	$http.post('http://localhost:3000/courses', JSON.stringify(newCourse)).success(function(response) {
				
				$scope.courses.push(response);

				//alert("Successfully signedup.");

				console.log(response);
			});


	     //console.log($scope.courses);

	     $location.path("/courses");

  	}


}());
/* Adding courses ended here */

/* Showing topics in Course Topics page */
(function() {

	var courseSelected = {};
	$scope.displayTopics = function(course) {

		courseService.setSelectedCourse(course);

		//console.log(course);
		$location.path("/courseTopics");

	};

}());

 
}]);


myApp.controller("topicsController",['$scope', 'courseService', function($scope, courseService){

  $scope.message = "ehllo";

  $scope.selectedCourse = courseService.selectedCourse;

	console.log(courseService.selectedCourse);

}]);


