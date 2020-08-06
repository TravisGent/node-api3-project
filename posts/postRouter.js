const express = require('express');

const router = express.Router();

const postDataBase = require("./postDb.js");
const userDataBase = require("../users/userDb.js");

router.get('/', (req, res) => {
  postDataBase.get()
    .then(posts => {
      res.status(200).json({ data: posts})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  postDataBase.getById(id)
    .then(posts => {
      res.status(200).json({ data: posts})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  postDataBase.remove(id)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not delete the post" });
    });
});

router.put('/:id', validatePostId, (req, res) => {
  const { id } = req.params;
  const newPost = req.body;

  db.update(id, newPost)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not edit the post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  userDataBase.getById(req.params.id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "post not found" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not find the post" });
    })
}

module.exports = router;
