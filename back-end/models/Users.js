const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"]
	},
	password: {
		type: String,
		required: [true, "Password is required"]
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile No is required"]
	},
	  orderedProduct: [
	    {
	      products: [
	        {
	          productId: {
	            type: String,
	            required: [true, "Product ID is required"]
	          },
	          productName: String,
	          quantity: {
	            type: Number,
	            default: 0 // Default quantity is set to 0
	          }
	        }
	      ],
	      totalAmount: {
	        type: Number,
	        default: 0 // Default totalAmount is set to 0
	      },
	      purchasedOn: {
	        type: Date,
	        default: new Date()
	      }
	    }
	  ]
	});
module.exports = mongoose.model("User", userSchema);