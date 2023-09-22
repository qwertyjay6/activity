const User = require("../models/Users");


const bcrypt = require("bcrypt");

const auth = require("../auth");
  

module.exports.registerUser = (reqBody) => {
  let newUser = new User({
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    password: bcrypt.hashSync(reqBody.password,10)

  });
  return newUser.save()
    .then((user, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
};

module.exports.loginUser=(reqBody)=>{
	return User.findOne({email:reqBody.email}).then(result =>{
		if (result == null){
			return false

		} else{
			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password)
			if (isPasswordCorrect){
				return{access:auth.createAccessToken(result)}

			}else{
				return false;
			}
		}
	})
}

module.exports.registerAdmin = (reqBody) => {
  let newUser = new User({
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    password: bcrypt.hashSync(reqBody.password,10),
    isAdmin :true
  });
  return newUser.save()
    .then((user, error) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
};

module.exports.getProfile1 = (data) => {
return User.findById(data.userId).then(result => {
  // Changes the value of the user's password to an empty string when returned to the frontend
  // Not doing so will expose the user's password which will also not be needed in other parts of our application
  // Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
  result.password = "";
  // Returns the user information with the password as an empty string
  return result;
  });
};



module.exports.getProfile = (data) => {
  if (data.isAdmin) {
    return User.findById(data.userId).then(result => {
      return result;
    });
  } else {
   
    return Promise.reject(new Error('User is not an admin'));
  }
};

module.exports.checkEmailExists = (reqBody) => {
  // The result is sent back to the Postman via the "then" method found in the route file
  return User.find({email : reqBody.email}).then(result => {
    // The "find" method returns a record if a match is found
    if (result.length > 0) {
      return true;
    // No duplicate email found
    // The user is not yet registered in the database
    } else {
      return false;
    };
  });
};

module.exports.getProfile1 = (data) => {
return User.findById(data.userId).then(result => {
  // Changes the value of the user's password to an empty string when returned to the frontend
  // Not doing so will expose the user's password which will also not be needed in other parts of our application
  // Unlike in the "register" method, we do not need to call the mongoose "save" method on the model because we will not be changing the password of the user in the database but only the information that we will be sending back to the frontend application
  result.password = "";
  // Returns the user information with the password as an empty string
  return result;
  });
};

