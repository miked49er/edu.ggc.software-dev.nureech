var mongoose = require('mongoose');

var ReechSchema = new mongoose.Schema({
  body: String,
  author: String,
  timestamp: {type: Date, default: Date.now},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Reech', ReechSchema);
