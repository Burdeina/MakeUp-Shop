var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myobj = [
    {  name: 'lipstick', producer: 'Dior',volume:'12 ml',classification:'Elite',made_in:'France',pageid:'2',price:'125',discount:'5'},
    {  name: 'eyeshadow', producer: 'Dior',volume:'12 ml',classification:'Elite',made_in:'France',pageid:'2',price:'3245',discount:'10'},
    {  name: 'tint', producer: 'Dior',volume:'12 ml',classification:'Elite',made_in:'France',pageid:'2',price:'1240',discount:'5'},
    {  name: 'liner', producer: 'Loreal',volume:'12 ml',classification:'Mass Market',made_in:'France',pageid:'2',price:'1545',discount:'5'},
    {  name: 'lipstick', producer: 'Loreal',volume:'12 ml',classification:'Mass Market',made_in:'France',pageid:'2',price:'565',discount:'5'},
    {  name: 'mascara',  producer: 'Loreal',volume:'12 ml',classification:'Mass Market',made_in:'France',pageid:'2',price:'455',discount:'5'},
    {  name: 'eyeliner', producer: 'Chanel',volume:'12 ml',classification:'Elite',made_in:'France',pageid:'2',price:'605',discount:'0'}

  ];
  dbo.collection("products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res);
    db.close();
  });
});
