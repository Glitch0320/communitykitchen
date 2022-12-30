const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  zipCode: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  password: { type: String },
})

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next()
})

const User = model("User", UserSchema)
module.exports = User