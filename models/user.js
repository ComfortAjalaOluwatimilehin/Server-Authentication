const mongoose = require("mongoose"),
bcrypt = require("bcrypt-nodejs")
schema = mongoose.Schema

var User = schema({
      email:{type:String, unique:true,lowercase:true},
      password:{type:String}
})
User.pre("save", function(next){
    const user = this
    bcrypt.genSalt(10, function(err, salt){
        if(err)
          return next(err)
          bcrypt.hash(user.password, salt, null, function(err,hash){
              if(err)
                return next(err)
                user.password = hash
              return next()
          })
    })
})

User.methods.comparePassword = function(candidatepassword, callback){
      bcrypt.compare(candidatepassword, this.password, function(err, isMatch){
              if(err)
                return callback(err)
              return callback(null, isMatch)
      })
}
module.exports = mongoose.model("user", User)
