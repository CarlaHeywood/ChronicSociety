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

    userApi.get("/user", authenticate, function(req, res){
        console.log(req.body);
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
