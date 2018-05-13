var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/test';

router.get('/', function(req, res, next){
  res.render('index');
});

router.get('/get-data', function(req, res, next){
  var resultArray = [];

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();

    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});


router.post('/insert', function(req, res, next){
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  mongo.connect(url, function(err, db){
    assert.equal(null, err);

    db.collection('user-data').insertOne(item, function(err, result){
     
      assert.equal(null, err);

     console.log('Item inserted done');

     db.close();
     res.redirect('/get-data');
    });
  });

  res.redirect('/');
});


router.post('/update', function(req, res, next){
  var item =  {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  mongo.connect(url, function(err,db){
    assert.equal(null,err);
    db.collection('user-data').updateOne({"_id":objectId(id)},{$set: item}, function(err, result){
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
      res.redirect('/get-data');
    });    
  });
});


router.post('/delete', function(req, res, next){
  var id = req.body.id;

  mongo.connect(url, function(err,db){
    assert.equal(null, err);
    db.collection('user-data').deleteOne({"_id": objectId(id)},function(err, result){
        assert.equal(null,err);
        console.log('Item deleted');
        db.close();
        res.redirect('/get-data');
    });
    
  });
});

module.exports = router;