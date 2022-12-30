const { Schema, model } = require("mongoose")

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: String },
  price: { type: String },
  zipCode: { type: String }
})

const Post = model("Post", postSchema)
module.exports = Post