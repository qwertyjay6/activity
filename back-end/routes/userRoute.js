

const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const auth = require ("../auth")



 
router.post("/register", (req, res) => {
  userController.registerUser(req.body)
    .then(resultFromController => res.send(resultFromController));
});



router.post("/login",(req,res) =>{
	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
})


router.post("/register/admin",(req,res)=>{
	userController.registerAdmin(req.body)
	.then(resultFromController => res.send(resultFromController));
})


router.post("/checkEmail", (req, res) => {
	userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});


router.get("/retrieve",auth.verify,(req,res) =>{
	let data = {
		isAdmin:auth.decode(req.headers.authorization).isAdmin,
		userId: req.body.userId
	}
		userController.getProfile(data).then(resultFromController => res.send(resultFromController));
	});
router.get("/details", auth.verify, (req, res) => {

	// Uses the "decode" method defined in the "auth.js" file to retrieve the user information from the token passing the "token" from the request header as an argument
	const userData = auth.decode(req.headers.authorization)

	// Provides the user's ID for the getProfile controller method
	userController.getProfile1({userId: userData.id}).then(resultFromController => res.send(resultFromController));
});




//Non Admin user Check out


module.exports = router;