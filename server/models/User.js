const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  contact: { type: String, maxlength: 32, default: 'email' },
  zipCode: { type: String, minlength: 5, maxlength: 5 },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  password: { type: String, minlength: 8, maxlength: 20 }
})

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next()
})

const User = model("User", UserSchema)
module.exports = User