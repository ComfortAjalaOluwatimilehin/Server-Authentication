const User = require("../models/user")
const jwt = require("jwt-simple")
const config = require("../config")


function tokenForUser(user){
  const timestamp = new Date().getTime()
  return jwt.encode({sub:user._id, iat:timestamp}, config.secret)
}

exports.signup = function(req,res,next){
      const email = req.body.email
      const password = req.body.password
      if(!email || !password)
        return res.status(400).send({error:"You must provide a valid email and a password"})
      //check if user with the given email exists
      User.findOne({email:email}, function(err, existingUser){
          if(err)
            return next(err)
            //if user does exists, send error
          if(existingUser)
            return  res.status(422).send({error:"Email already exists"})
          //if user does not exist, create and save user
          var user = new User({email:email,password:password})
          user.save(function(err){
                if(err)
                    return next(err)
                return res.json({token:tokenForUser(user)})
          })
      })


      //respond to request by indicating user created
}

exports.signin = function(req,res,next){
      res.send({token: tokenForUser(req.user)})
}
