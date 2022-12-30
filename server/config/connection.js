const mongoose = require("mongoose")
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection