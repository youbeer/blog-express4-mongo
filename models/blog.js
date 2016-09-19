var mongoose = require('mongoose');

module.exports = mongoose.model('blogs', {
  title: {type: String, default: ''},
  body: {type: String, default: ''}
});