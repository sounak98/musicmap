import _ from 'lodash';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { UserModel } from './models/userModel';

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mysecretkey';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    UserModel.findOne({ _id: jwt_payload.id }).exec((err, user) => {
        if (err) {
            // check what will trigger this
        }
        if (user) {
            next(null, user);
        }
        else {
            next(null, false);
        }
    });
});
  
passport.use(strategy);

export { jwtOptions };
