//Dependencies 
const express = require('../node_modules/express');
const router = express.Router();
const User = require('../models/users')


//Controller 
// const riversController = require('method-override');

//model
const Rivers = require('../models/rivers');


//-------------------------------------------
//       Routes
//-------------------------------------------


//Index
router.get('/' , (req, res) => {
    Rivers.find({}, (error, allRivers) => {
        res.render('index.ejs', {
        rivers: allRivers
        })
    })
  });

  
    
    //Edit post
    router.get('/:id/edit', (req, res) => {
        Rivers.findById(req.params.id, (err, foundRiver) => {
            if (err) {
                console.log(err)
            } else {
                res.render('edit.ejs', {
                    river: foundRiver
                })
            }
        })
    })
    
    //Show post
    router.get('/:id', (req, res) => {
        Rivers.findById(req.params.id, (err, foundRiver) => {
            res.render('show.ejs', {
                river: foundRiver
            });
        });
    });
    
  //PUT 
  router.put('/:id', (req, res) => {
    if (req.body.stocked === 'on'){
        req.body.stocked = true;
      } else {
          req.body.stocked = false;
      }
      Rivers.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRiver) => {
          if (err) {
              console.log(err);
          } else {
              res.redirect(`/rivers/${req.params.id}`);
          }
      });
  });

  //Create Post
  router.post('/', (req, res) => {
      console.log(req.body);
      if (req.body.stocked === 'on'){
        req.body.stocked = true;
      } else {
          req.body.stocked = false;
      }
      Rivers.create(req.body, (error, createdRiver) => {
          if (error) {
              res.send(error)
          } else {
              res.redirect('/rivers');
          }
      });
  })

  router.delete('/:id', (req, res) => {
      Rivers.findByIdAndRemove(req.params.id, (err, deletedRiver) =>{
          if (err) {
              console.log(err)
          } else {
              res.redirect('/rivers')
          }
      })
  })


  module.exports = router