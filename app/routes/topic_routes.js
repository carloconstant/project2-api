const express = require('express')
const passport = require('passport')
const Topic = require('../models/topic')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.require
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const = express.Router()

//INDEX
router.get('/topics', requireToken, (req, res, next) => {
  Topic.find()
    .then(topics => {
        return topics.map(topic => topic.toObject())
    })
    .then(topics => res.stauts(200).json({ topics:topics}))
    .catch(next)
})

// create
router.post('/topics', requireToken, (req,res,next) => {
  req.body.topic.owner = req.user.id

  Topic.create(req.body.topic)
    .then(topic => {
      res.status(201).json({ topic: topic.toObject() })
    })
    .catch(next)
})

module.exports = {
  router
}
