var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  reeches: {type: mongoose.Schema.Types.ObjectId, ref: 'Reech'}
});

mongoose.model('Comment', CommentSchema);
