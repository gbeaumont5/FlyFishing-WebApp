//Dependencies 
const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcrypt');
require('dotenv').config();


//Controller 
// const riversController = require('method-override');


// Seed
const seed = require('../models/seed');
//model
const Rivers = require('../models/rivers');


//-------------------------------------------
//       Routes
//-------------------------------------------

//Seed the Data
router.get('/seedRivers', (req, res) => {
    Rivers.create(seed, (err, createdRivers) => {
        res.redirect('/');
    })
})

//Index
router.get('/' , (req, res) => {
    Rivers.find({}, (error, allRivers) => {
        res.render('index.ejs', {
        rivers: allRivers,
        currentUser: req.session.currentUser
        })
    })
  });

    //New post

    router.get('/new', (req, res) => {
        res.render('new.ejs')
    })




  
    
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
                river: foundRiver,
                currentUser: req.session.currentUser,
                MAP: process.env.MAP
            });
        });
        
    });
    
  //PUT / Update 
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

  // Comment Route
    router.put('/comments/:id', (req, res) => {
        console.log(req.body)
        Rivers.findByIdAndUpdate(req.params.id, Rivers.update({$push: {comments: req.body.comments}}), {new: true}, (err, updatedComment) => {
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