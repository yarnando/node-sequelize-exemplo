const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
   console.log('serializing');
   console.log(user);
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    console.log('DEserializing');
    console.log(user);
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "706099597834-3p55kvpfh7cq2ghsrjj5a0acqhrrin0o.apps.googleusercontent.com",
    clientSecret: "5tSW_hHqizNxq1QhCcW-FKtP",
    callbackURL: "http://localhost:9001/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
    return done(null, profile);
  }
));