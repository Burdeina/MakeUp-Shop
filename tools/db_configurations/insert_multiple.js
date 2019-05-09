var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myobj = [
    { _id: 1, name: 'lipstick', producer: 'Dior'},
    { _id: 2, name: 'eyeshadow', producer: 'Dior'},
    { _id: 3, name: 'tint', producer: 'Dior'},
    { _id: 4, name: 'liner', producer: 'Loreal'},
    { _id: 5, name: 'lipstick', producer: 'Loreal'},
    { _id: 6, name: 'mascara',  producer: 'Loreal'},
    { _id: 7, name: 'eyeliner', producer: 'chanel'}
  ];
  dbo.collection("products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res);
    db.close();
  });
});
