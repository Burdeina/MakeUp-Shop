var express = require('express');
var router = express.Router();

//model
var Product = require('../models/product');
var User = require('../models/user');


router.get('/add', ensureAuthenticated, function(req, res) {
    var errors = req.validationErrors();

    res.render("add_product", {
        title: "Add product",
        errors: errors
    });
});

router.post('/add', ensureAuthenticated, function(req, res) {
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('producer', 'producer is required').notEmpty();
  req.checkBody('volume', 'volume is required').notEmpty();
  req.checkBody('classification', 'classification is required').notEmpty();
  req.checkBody('made_in', 'made_in is required').notEmpty();
  req.checkBody('pageid', 'pageid is required').notEmpty();
  req.checkBody('price', 'price is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render('add_product', {
            title: "Add product",
            errors: errors
        });
    } else {
        let product = new Product();
        product.name = req.body.name;
        product.producer = req.body.producer;
        product.volume = req.body.volume;
        product.classification = req.body.classification;
        product.made_in = req.body.made_in;
        product.pageid = req.body.pageid;
        product.price = req.body.price;
        product.discount = 0;

        product.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success', 'Product added');
                res.redirect('/');
            }
        });
    }
});

router.get('/edit/:id', ensureAuthenticated, function(req, res){
    Product.findById(req.params.id, function(err, product){
      // User.findById(req.user._id, function(err, user){
      //     if(!user.isAdmin){
      //         req.flash('danger', 'You do not have access to this page');
      //         res.redirect('/');
      //     }
           if(err){
               console.log(err);
           } else {
               res.render("edit_product", {
                   title: "Edit product",
                   product: product
               });
           }
      // });
   });
});

router.post('/edit/:id', ensureAuthenticated, function(req, res) {
    let product = {};
    product.name = req.body.name;
    product.producer = req.body.producer;
    product.volume = req.body.volume;
    product.classification = req.body.classification;
    product.made_in = req.body.made_in;
    product.pageid = req.body.pageid;
    product.price = req.body.price;
    product.discount = req.body.discount;

    var query = { _id: req.params.id};

    Product.updateOne(query, product, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Product updated');
            res.redirect('/');
        }
    });
});
router.get('/add_discount/:id', ensureAuthenticated, function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        } else {
            res.render("add_discount", {
                title: "Add discount",
                product: product
            });
        }
    });
});

router.post('/add_discount/:id', ensureAuthenticated, function(req, res) {
    let product = {};
    product.discount = req.body.discount;

    var query = { _id: req.params.id};

    Product.updateOne(query, product, function(err){
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success', 'Discount added!');
            res.redirect('/');
        }
    });
});

router.delete('/:id', ensureAuthenticated, function(req, res){
    var query = { _id: req.params.id};

    //console.log(req.params.id);
    Product.remove(query, function(err){
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});

router.get('/:id', ensureAuthenticated, function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(err){
            console.log(err);
        } else {
            res.render("product", {
                title: "Product card",
                product: product
            });
        }
    });
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
    }
  }
//                             |
//to do: something with that  \|/

// app.get('/product/:model', function(req, res) {
//     var query = { model: req.params.model };
//     Product.find(query, function(err, products){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("product", {
//                 title: "Product card",
//                 products: products
//             });
//         }
//     });
// });

module.exports = router;
