const { Post, User } = require("../models/")
const connection = require("../config/connection")

require("dotenv").config()

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body)
    await User.findByIdAndUpdate(req.params.userId, {
      $push: { posts: post._id }
    })
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ message: 'Unable to create post' })
  }
}

const getPostsByZip = async (req, res) => {
  try {
    const posts = await Post.find({
      zipCode: req.params.zip
    }).populate({
      path: 'user',
      select: 'username'
    })
    res.status(200).json(posts)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.postId)
    const user = await User.findByIdAndUpdate(req.params.userId, {
      $pull: { posts: req.params.postId }
    }, { new: true })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ message: 'Unable to delete post' })
  }
}

module.exports = {
  getPostsByZip,
  createPost,
  deletePost
}