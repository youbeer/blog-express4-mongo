var Blog = require('../models/blog')

exports.index = function(req, res, next) {
  Blog.find(function(err, posts){
    if (err) {
      next(new Error('error'));
    } else {
      res.render('posts/index', {posts: posts});
    }
  });
}

exports.show = function(req, res, next) {
  Blog.findById(req.params.id, function(err, post){
    if (err) {
      next(new Error('show: action id not valid'));
    } else {
      res.render('posts/show', {post: post});
    }
  });
}

exports.new = function(req, res) {
  res.render('posts/new');
}

exports.create = function(req, res) {
  var blog = new Blog({title: req.body.title, body: req.body.body});
  blog.save(function(err) {
    if(err){ return; }
  });
  res.redirect('/');
}

exports.edit = function(req, res, next) {
  Blog.findById(req.params.id, function(err, post){
    if (err) {
      next(new Error('edit: action id not valid'));
    } else {
      res.render('posts/edit', {post: post});
    }
  });
}

exports.update = function(req, res, next) {
  Blog.findOne({_id: req.body.id}, function(err, post){
    if (err || post === null) {
      next(new Error('update: action id not valid'));
    } else {
      post.title = req.body.title;
      post.body = req.body.body;
      post.save()
      res.redirect('/');
    }
  });
}

exports.destroy = function(req, res, next) {
  Blog.remove({_id: req.params.id}, function(err, post){
    if (err || post === null) {
      next(new Error('destroy: action id not valid'));
    } else {
      res.redirect('/');
    }
  });
}
