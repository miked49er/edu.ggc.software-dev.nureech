var express = require('express');
var jwt = require('express-jwt');
var router = express.Router();
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NuReech' });
});

var mongoose = require('mongoose');
var passport = require('passport');
var Reech = mongoose.model('Reech');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

router.post('/register', function(req, res, next) {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.email = req.body.email;
  user.username = req.body.username;

  user.setPassword(req.body.password);

  user.save(function(err) {
    if (err) { next(err); }

    return res.json({token: user.generateJWT()});
  });
});

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.post('/reeches', auth, function(req, res, next) {
  var reech = new Reech(req.body);
  reech.author = req.payload.username;

  reech.save(function(err, reech) {
    res.json(reech);
  });
});

router.get('/reeches', function(req, res, next) {
  Reech.find(function(err, reeches) {
    if (err) { next(err); }

    res.json(reeches);
  });
});

router.param('reech', function(req, res, next, id) {
  var query = Reech.findById(id);

  query.exec(function(err, reech) {
    if (err) { return next(err); }
    if (!reech) { return next(new Error('can\'t find reech')); }

    req.reech = reech;
    return next();
  });
});

router.get('/reeches/:reech', function(req, res, next) {
  req.reech.populate('comments', function(err, reech) {
    if (err) { return next(err); }

    res.json(reech);
  });
});

router.post('/reeches/:reech/comments', auth, function(req, res, next) {
  var comment = new Comment(req.body);
  comment.reech = req.reech;
  comment.author = req.payload.username;

  comment.save(function(err, comment) {
    if (err) { return next(err); }

    req.reech.comments.push(comment);
    req.reech.save(function(err, reech) {
      if (err) { return next(err); }

      res.json(comment);
    });
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function(err, comment) {
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find the comment')); }

    req.comment = comment;
    return next();
  });
});

module.exports = router;
