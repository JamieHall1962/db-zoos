const express = require('express');

const zoos = require('./zoosModel');

const router = express.Router();

// The C of CRUD

router.post("/", (req, res) => {
    const { name } = req.body;
    const zoo = { name };
  
    if (!name) {
      return res
        .status(400)
        .json({ error: "Please provide a name for your zoo." });
    }
    zoos
      .create(zoo)
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => {
        res.status(500).json({error: "Server Error. Unable to Create Zoo"});
      });
  });
  
// The R of CRUD

router.get("/", (req, res) => {
  zoos
    .read()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
        res.status(500).json({error: "Server Error. Unable to Read Zoo"});
});
})

// and now Read with ID

router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const zoo = await zoos.readById(id);
  
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "The zoo with the specified ID could not be found." });
      }
    } catch (error) {
      res.status(500).json({error: "Server Error. Unable to Read Zoo"});
    }
  });

// The U of CRUD

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  zoos
    .update(id, changes)
    .then(zoo => {
      if (!zoo) {
        res.status(404).json({ message: "The zoo with that ID could not be found" });
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => { res.status(500).json({error: "Server Error. Unable to Update Zoo"});
});
})

// The D of CRUD

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  zoos
    .del(id)
    .then(zoo => {
      if (!zoo || zoo < 1) {
        res.status(404).json({ message: "The zoo with that ID could not be found" });
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => { res.status(500).json({error: "Server Error. Unable to Delete Zoo"});
});
})

module.exports = router;