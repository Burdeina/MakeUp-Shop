var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myquery = { name: /^Lipstick/ };
  var newvalues = {$set: {name: "Lipstick Maximazer"} };
  dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log(res.result.nModified + " document(s) updated");
    db.close();
  });
});

// The result object looks like this:
// { n: 1, nModified: 2, ok: 1 }
