var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

//Schema.plugin(uniqueValidator);

/*
I have added the following code in mongo shell for the uniqueness of "username".

db.users.createIndex({username: 1}, {unique:true})

and it returns the following.

{
    "createdCollectionAutomatically" : false,
    "numIndexesBefore" : 1,
    "numIndexesAfter" : 2,
    "ok" : 1
}
*/

var userSchema = new Schema({
	 username: { type: String, unique : true, required: true},
     password: { type: String, required: true },
     firstname: {type:String, required: true},
     middlename: String,
      lastname : {type:String, required: true},
      DOB: Date,
      phoneNumber : String,     
      
        created_at: Date,
        updated_at: Date
        
    },
    {   
        collection : 'users'
    }

);

var tDetailsSchema = new Schema({ 
        name: {type: String, required: true },
        duration: {type: Number, required: true}
});


var courseSchema = new Schema({
        userId: { type: String, required: true },
        name:{type: String, required: true},
        description: String,
        skillLevel: String,
        preReqs: String,
        endGoal: {type: String, required: true},
        courseType : String,
        fee: Number,
        topicDetails: [tDetailsSchema],
        autherFullname: {type: String, required: true},
        created_at: Date,
        updated_at: Date        
    },
    {
        collection : 'courses'
    }
);

userSchema.pre('save', function(next){
    var currentDate = new Date();
    
    this.updated_at = currentDate;
    if (!this.created_at){
        this.created_at = new Date();
    }
    next();
});

courseSchema.pre('save', function(next){
    var currentDate = new Date();
    
    this.updated_at = currentDate;
    if (!this.created_at){
        this.created_at = new Date();
    }
    next();
});

var User = mongoose.model('User', userSchema);

var Course = mongoose.model('Course', courseSchema);



module.exports = {user : User, course : Course };


