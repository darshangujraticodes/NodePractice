const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "images/defaultUserAvatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(10).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

// mongoose virtual functions

userSchema.static("matchPassword", async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) return null;

    const dbSalt = user.salt;
    const dbHashPassword = user.password;

    const clientEnteredHashedPassword = createHmac("sha256", dbSalt)
      .update(password)
      .digest("hex");

    if (dbHashPassword !== clientEnteredHashedPassword)
      throw new Error("Invalid email or password");

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;

    return userObj;
  } catch (error) {
    console.log("matchPassword() | Virtual Function error :-", error.message);
    throw error;
  }
});

const User = model("User", userSchema);

module.exports = User;
