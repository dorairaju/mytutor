var express = require('express')
var app = express();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var crypto = require('crypto-js');

var cors = require('cors');
var _ = require('underscore');


var bodyParser = require('body-parser');
var db = require('./model/db.js');
var User = db.user;
var Course = db.course;
var PORT = process.env.PORT || 3000;

var encryptionKey = "secretKey";

dbUrl = "mongodb://localhost:27017/mytutor";

var myDb = mongoose.connect(dbUrl);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/'));



app.listen(PORT, function (){
    console.log('i am listening' + PORT);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Encrypting the password
var encryptPassword = function(password){
    //we can add steps here to encrypt password
    var encryptedPassword = crypto.AES.encrypt(password, encryptionKey);
    return encryptedPassword;
}

app.get('/users', function (req, res){

    	User.find(function(err, user){
    		if(err){
    			throw err;
    		}else {
                res.json(user);    
            }
    		
    	});

	//res.status(200).send("user");
	//res.json(User);

});

//Getting user data by username
app.get('/users/:username', function (req, res){

    	User.find({username: req.params.username}, function(err, user){
    		if(err){
    			throw err;
    		}
            else{
                //var editUser = _.pick(user, 'username', 'password');

                //console.log(typeof(user));

                res.json(user);    
            }
    		
    	});

	//res.status(200).send("user");
	//res.json(User);

});



app.post('/users', function (req, res){
		var userDb = req.body;

        //console.log((userDb.username).toLowerCase() );
	
		
		var user = new User ({username:(userDb.username).toLowerCase(), password: encryptPassword(userDb.password), firstname: userDb.firstname, middlename: userDb.middlename, lastname: userDb.lastname, DOB: userDb.DOB, phoneNumber: userDb.phoneNumber  });
		//var user = new User ({username:temp.username, password: temp.password, firstname: temp.firstname, middlename: temp.middlename, lastname: temp.lastname, DOB: temp.DOB, phoneNumber: temp.phoneNumber  });

				user.save(function(err) {
        if (err){
            res.status(404).json({"error":err});
        }
        else{
            console.log('User saved successfully!');
            res.status(200).send(user.toJSON());    
        }
        
    });

});

app.get('/courses', function (req, res){

    	Course.find(function(err, course){
    		if(err){
    			throw err;
    		}
    		res.json(course);
    	});


});

//Getting courses by course name
app.get('/courses/:coursename', function (req, res){

    	Course.find({name: req.params.coursename}, function(err, course){
    		if(err){
    			throw err;
    		}
    		res.json(course);
    	});


});


//Getting courses by course name
app.get('/coursesID/:userId', function (req, res){

      
        Course.find({userId: req.params.userId}, function(err, course){
            if(err){
                throw err;
            }
            res.json(course);
        });

    //res.json({name: "dorai", id: 1});

});


app.post('/courses', function (req, res){

		var courseDb = req.body;

		var course = new Course ({userId:courseDb.userId, name:courseDb.name, description: courseDb.description, skillLevel: courseDb.skillLevel, preReqs: courseDb.preReqs, endGoal: courseDb.endGoal, courseType : courseDb.courseType, fee: courseDb.fee, topicDetails: courseDb.topicDetails, autherFullname: courseDb.autherFullname });
      
      
		course.save(function(err) {
        if (err){
            res.status(404).json({"error":err});
        }
        else{
            console.log('Course saved successfully!');
            res.status(200).send(course.toJSON());            
        }
        

    });

});


/*
app.get('/', function  (req, res) {
	
	//res.sendFile(__dirname + '/client/view/index.html');
	//res.send("Welcome to your local server");
     res.json({name: "dorai", id: 1});
});
*/


