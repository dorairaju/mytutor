myApp.service('courseService', [function () {

		this.selectedCourse = null;
		this.regCourses = null;
		this.currentUser = null;

	    this.setSelectedCourse = function (course) {
        	this.selectedCourse = course;
    	};

    	this.setRegCourses = function (regCourses) {
    		this.regCourses = regCourses;
    	};

    	this.setCurrentUser = function (user) {
    		this.currentUser = user;
    	};

}]);