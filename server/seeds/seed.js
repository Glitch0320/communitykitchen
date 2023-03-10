const { User, Post } = require("../models")
const connection = require("../config/connection")

const testUser = {
  "_id": "63a7b53fee01fe4d8ddbeadf",
  "username": "Dave",
  "email": "dave@gmail.com",
  "password": "hashthis",
  "zipCode": "90755",
  "posts": [
    "63a7b6043b2c53ddbc5d71af",
    "63a7b612ced80227a5e8e876"
  ]
}

const post1 = {
  "_id": "63a7b6043b2c53ddbc5d71af",
  "user": "63a7b53fee01fe4d8ddbeadf",
  "item": "potatoes",
  "price": "5$ per pound",
  "zipCode": "90755"
}

const post2 = {
  "_id": "63a7b612ced80227a5e8e876",
  "user": "63a7b53fee01fe4d8ddbeadf",
  "item": "sweet corn",
  "price": "2$ per ear",
  "zipCode": "90755"
}

const seed = async () => {
    await User.deleteMany({})
    await Post.deleteMany({})
    await User.create(testUser)
    await Post.insertMany([post1, post2])
    console.log('success!')
    process.exit()
}

seed()