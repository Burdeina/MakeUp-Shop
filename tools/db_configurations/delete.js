var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  /*Delete all products where the name starts with an "O":*/
//   var myquery = { name: /^O/ };
//   dbo.collection("products").deleteMany(myquery, function(err, obj) {


/*Delete the first customers with the name "Mount":*/
  var myquery = { name: 'Mount' };
  dbo.collection("products").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});
