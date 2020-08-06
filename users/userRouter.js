const express = require('express');

const router = express.Router();

const postDataBase = require("../posts/postDb.js");
const userDataBase = require("./userDb.js");

router.post('/', validateUser, (req, res) => {
  const newUser = req.body;
  userDataBase.insert(newUser)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not add the post" });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  const { id } = req.params;
  const newPost = req.body;
  newPost.user_id = id;

  postDataBase.insert(newPost)
    .then(post => {
      res.status(201).json({ data: post });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not add the post" });
    });
});

router.get('/', (req, res) => {
  userDataBase.get()
    .then(users => {
      res.status(200).json({ data: users})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  userDataBase.getById(id)
    .then(users => {
      res.status(200).json({ data: users})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;
  postDataBase.get()
    .then(posts => {
      const userPosts = posts.filter(newPost => parseInt(newPost.user_id) === parseInt(id));
      res.status(200).json({ data: userPosts })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "We could not get the data" });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  userDataBase.remove(id)
    .then(user => {
      res.status(201).json({ data: user });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not delete the user" });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  const newUser = req.body;

  userDataBase.update(id, newUser)
    .then(user => {
      res.status(201).json({ data: user });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not edit the user" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  userDataBase.getById(req.params.id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "user not found" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not find the user" });
    })
};

function validateUser(req, res, next) {
  userDataBase.insert(req.body)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "missing data" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not find the data" });
    })
}

function validatePost(req, res, next) {
  postDataBase.insert(req.body)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "missing data" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "We could not find the data" });
    })
}

module.exports = router;
