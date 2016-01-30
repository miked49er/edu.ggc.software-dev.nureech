var mongoose = require('mongoose');

var ReechSchema = new mongoose.Schema({
  body: String,
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Reech', ReechSchema);
