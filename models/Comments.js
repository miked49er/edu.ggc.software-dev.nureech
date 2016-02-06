var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  author: String,
  timestamp: {type: Date, default: Date.now},
  reech: {type: mongoose.Schema.Types.ObjectId, ref: 'Reech'}
});

mongoose.model('Comment', CommentSchema);
