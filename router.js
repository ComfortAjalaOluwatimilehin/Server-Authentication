const Authentication = require("./controllers/authentication")
const passportConfig = require("./services/passport")
const passport = require("passport")
const requireAuthJWT = passport.authenticate("jwt", {session:false})
const requireAuth = passport.authenticate("local", {session:false})
module.exports = function(app){
    app.get("/", requireAuthJWT, function(req,res){
          res.send({message:"Hi there"})
    })
    app.post("/signup", Authentication.signup)
    app.post("/signin",requireAuth, Authentication.signin )
}
