const express = require('express');
const app = express();
const mongodb = require('mongodb').MongoClient;

let url = 'mongodb://ip-172-31-21-38.us-east-2.compute.internal:27017/';
mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connection Established...');
  var db = client.db('Products');
  app.use(express.json());

  app.get('/products', (req, res) => {
    console.log('Product List Get');
    let count = (req.body.count);
    let page = (req.body.page);
    db.collection('Products').find().skip(count * page).limit(count).toArray()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      });
  });

  app.get('/products/:product_id', (req, res) => {
    console.log('Features Get');
    let pID = Number(req.params.product_id);
    db.collection('prod_ID').find({ _id: pID }).toArray()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      });
  });

  app.get('/products/:product_id/styles', (req, res) => {
    let pID = Number(req.params.product_id);
    console.log('Styles Get for item: ' + pID);
    db.collection('prodStyleOut').find({ _id: pID }).toArray()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      });
  });

  app.get('/products/:product_id/related', (req, res) => {
    console.log('Related Products List Get');
    let pID = Number(req.params.product_id);
    db.collection('relatedProds').find({ _id: pID }).toArray()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      });
  });


  const port = 3001;
  app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });

});