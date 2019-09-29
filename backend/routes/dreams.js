const router = require('express').Router(); //create route
let Dream = require('../models/dream.model'); //require model

router.route('/').get((req, res) => {
    Dream.find()
        .then(dreams => res.json(dreams))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newDream = new Dream({
        username,
        description,
        date,
    });

    newDream.save()
        .then(() => res.json('Dream added!'))
        .catch(err => res.status.json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Dream.findById(req.params.id)
        .then(dreams => res.json(dreams))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;