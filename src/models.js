const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
  },
});

const Url = mongoose.model('Url', UrlSchema);

module.exports = Url;
