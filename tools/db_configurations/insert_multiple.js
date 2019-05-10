var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myobj = [
    { _id: 1, name: 'lipstick', producer: 'Dior',volume:'12 ml',classification:'Elite',made_in:'France'},
    { _id: 2, name: 'eyeshadow', producer: 'Dior',volume:'12 ml',classification:'Elite',made_in:'France'},
    { _id: 3, name: 'tint', producer: 'Dior',volume:'12 ml',classification:'Elite',made_in:'France'},
    { _id: 4, name: 'liner', producer: 'Loreal',volume:'12 ml',classification:'Mass Market',made_in:'France'},
    { _id: 5, name: 'lipstick', producer: 'Loreal',volume:'12 ml',classification:'Mass Market',made_in:'France'},
    { _id: 6, name: 'mascara',  producer: 'Loreal',volume:'12 ml',classification:'Mass Market',made_in:'France'},
    { _id: 7, name: 'eyeliner', producer: 'Chanel',volume:'12 ml',classification:'Elite',made_in:'France'}
    
  ];
  dbo.collection("products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res);
    db.close();
  });
});
