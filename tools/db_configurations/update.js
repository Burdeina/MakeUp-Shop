var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myquery = { name: "Powder" };
  var newvalues = { $set: { name: "Foudation", producer: "Nyx" } };
  //When using the $set operator, only the specified fields are updated:
  //var newvalues = {$set: {address: "Canyon 123"} };
  dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
