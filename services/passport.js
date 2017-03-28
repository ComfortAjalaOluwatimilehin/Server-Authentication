//passort to authenticate a user when needing a route that required authentication

const passport = require("passport")
const User = require("../models/user")
const config = require("../config")
const jwtstrategy = require("passport-jwt").Strategy
const extractjwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");
//create local Strategy
const localOptions = {
    usernameField:"email",
    passwordField:"password"
}
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
        //verify if email and password match
        User.findOne({email:email}, function(err, existingUser){
              if(err)
                return done(err, false)
              if(!existingUser)
                return done(err, false)
              existingUser.comparePassword(password, function(err, isMatch){
                    if(err)
                      return done(err, false)
                    if(isMatch)
                      return done(null, existingUser)
                    if(!isMatch)
                      return done(null, false)
              })
        })
})



//setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest:extractjwt.fromHeader("authorization"),
  secretOrKey:config.secret
}

//create jwt Strategy

const jwtLogin = new jwtstrategy(jwtOptions, function(payload, done){
    User.findById({_id: payload.sub}, function(err, existingUser){
          if(err) return don(err,false)
          if(existingUser) return done(null, existingUser)
          return done(null,false)
    })
})


//tell passport to use strategy
passport.use(jwtLogin)
passport.use(localLogin)
