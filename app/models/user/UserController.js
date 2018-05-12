let User = require("./user.js").User;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");



module.exports = function (app, express) {

    let userApi = express.Router();
    // Create new user
    userApi.post("/", (req, res) => {
        let body = _.pick(req.body, ['email', 'password', 'firstname', 'lastname', 'address', 'frequency', 'strain', 'preference']);
        let user = new User(body);

        console.log(body);
        user.save().then((user) => {
            console.log("Calling generateAuthToken");
            return user.generateAuthToken();
        }).then((token) => {
            console.log("Token created", token);
            res.status(200).send({
                success: true,
                message: "Login Success",
                token: token,
                user: user
            });
        }).catch((e) => {
            res.status(400).send(e);
        })
    });

    userApi.get("/user", authenticate, function (req, res) {
        console.log("Called?")
        console.log(req.body);
        User.find({ _id: req.user }, function (err, user) {
            if (err) console.log(err);
            console.log(user);

            res.status(200).send({
                success: true,
                message: "User retrieved",
                user: user
            })
        })
    })

    userApi.put("/user/update", authenticate, function (req, res) {
        console.log("Called Update User")
        var body = _.pick(req.body, ['email', 'password', 'firstname', 'lastname', 'address', 'frequency', 'strain', 'preference']);
        console.log("Body is: ", body);
        console.log("USER ", req.user._id)
        User.findById(req.user._id, function (err, user) {
            if (err || !user) return res.status(404).send({
                success: false, 
                message: "Not Found",

            });
            // console.log("THE USER", user);

            user.firstname = body.firstname;
            user.lastname = body.lastname;
            user.address = body.address; 
            user.email = body.email; 
            user.frequency = body.frequency; 
            user.strain = body.strain; 
            user.preference = body.preference;  
            user.save().then((user) => {
                res.status(200).send({
                    success: true,
                    message: "User retrieved",
                    user: user
                })
            }, (err)=>{
                console.log("An error occured", err);
            })

        })
    })

    // user log in
    userApi.post("/login", (req, res) => {
        var body = _.pick(req.body, ['email', 'password']);
        console.log("In login");

        User.findByCredentials(body.email, body.password).then((user) => {
            return user.generateAuthToken().then((token) => {

                res.header("x-auth", token).send({
                    success: true,
                    message: "Login Success",
                    token: token,
                    user: user
                });

                // console.log("Token is: ", token);
            });
        }).catch((e) => {
            res.status(400).send();
        });
    });

    // user sign off
    userApi.delete("/user/remove/token/", authenticate, (req, res) => {
        console.log(req.body);
        req.user.removeToken(req.token).then(() => {
            res.status(200).send({
                success: true,
                message: "Token Removed"
            });
        }).catch((e) => {
            res.status(400).send();
        })
    })

    return userApi;

}
