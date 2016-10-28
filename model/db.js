
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true },
     password: { type: String, required: true },
     firstname: {type:String, required: true},
     middlename: String,
      lastname : {type:String, required: true},
      DOB: Date,
      phoneNumber : Number,     
      
        created_at: Date,
        updated_at: Date
        
    },
    {   
        collection : 'users'
    }

);

var tDetailsSchema = new Schema({ 
        name: String,
        duration: Number
});


var courseSchema = new Schema({
        name:{type: String, required: true},
        description: String,
        skillLevel: String,
        preReqs: String,
        endGoal: {type: String, required: true},
        courseType : Boolean,
        fee: Number,
        topicDetails: [tDetailsSchema],
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


