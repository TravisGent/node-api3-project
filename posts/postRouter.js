const express = require('express');

const router = express.Router();

const db = require("./postDb.js");

router.get('/', (req, res) => {
  db.get()
    .then(posts => {
      res.status(200).json({ data: posts})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
