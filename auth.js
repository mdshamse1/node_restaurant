const passport = require('passport');
const Person = require('./models/person');
const  LocalStrategy = require('passport-local').Strategy;


// LocalStrategy 
passport.use(new LocalStrategy(async (username, password, done) => {
    // authentication logic 
    try {
        console.log('Received credentials: ', username, password);
        const user = await Person.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return done(null, false, { message: 'User not found' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            console.log('Incorrect password:', username);
            return done(null, false, { message: 'Incorrect password' });
        } else {
            console.log('Successful authentication:', username);
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    }
}));
module.exports = passport;