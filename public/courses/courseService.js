myApp.service('courseService', [function () {

		this.selectedCourse = null;

	    this.setSelectedCourse = function (course) {
        	this.selectedCourse = course;
    	};

}]);