const { Schema, model } = require("mongoose")

const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  item: { type: String, maxlength: 32 },
  price: { type: String, maxlength: 32 },
  zipCode: { type: String }
})

const Post = model("Post", postSchema)
module.exports = Post