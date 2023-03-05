const { Schema } = mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const UsersSchema = new Schema({
	firstname: {
	  type: String,
	},
	lastname: {
	  type: String,
	},
	email: {
	  type: String,
	  required: true,
	  unique: true,
	  validate(value) {
	    if (!validator.isEmail(value)) {
	      throw new Error("Invalid Email!!");
	    }
	  },
	},
	phone: {
	  type: String,
	  //required: true,
	  unique: true,
	  validate(value) {
	    if (!validator.isMobilePhone(value, ['ar-SA'])) {
	      throw new Error("Invalid Phone Number Your Number Is Should To Start With +965 For Saudia KSA!!");
	    }
	  },
	},
	password: {
	  type: String,
	  required: true,
	  minLength: 7,
	  trim: true,
	  validate(value) {
	    if (value.includes("password")) {
	      throw new Error("password musn't contains password");
	    }
	  },
	},
	paymentStatus: {
		type: String,
	},
	paymentInfo: {
		startDate: {
			type: Date,
			//required: true,
			validate(value) {
				if (!validator.isDate(value)) {
	    	  throw new Error("Invalid Date Please enter vaild date");
	    	}
			}
		},
		endDate: {
			type: Date,
			//required: true,
			validate(value) {
				if (!validator.isDate(value)) {
	    	  throw new Error("Invalid Date Please enter vaild date");
	    	}
			}
		},
		subscrubtionType: {
			type: String
		}
	},
	paymnetsHistory: [{
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		subscrubtionType: {
			type: String
		}
	}],
	paybackHistory: [{
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		subscrubtionType: {
			type: String
		}
	}],
	role: {
	  type: String,
	},
	lessons: [{
		id: {
			type: Schema.Types.ObjectId,
			ref: "Lessons"
		}
	}]
});
//console.log(UsersSchema);
UsersSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

UsersSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("user don't exist");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("wrong Password");
  }
  return user;
};

UsersSchema.pre("save", async function (next) {
  //this is refering to the user object
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

module.exports = mongoose.model("Users", UsersSchema);;