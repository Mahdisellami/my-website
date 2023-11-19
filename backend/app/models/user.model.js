const bcrypt = require("bcryptjs");

module.exports = mongoose => {
  var schema = mongoose.Schema({
    email: {
      type: String,
      required: [true, "Your email address is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Your username is required"],
    },
    password: {
      type: String,
      required: [true, "Your password is required"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  });

  schema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

  const User = mongoose.model("user", schema);
  return User;
};