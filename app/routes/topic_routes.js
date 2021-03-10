const express = require('express')
const passport = require('passport')
const Topic = require('../models/topic')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.require
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()
// INDEX
router.get('/topics', (req, res, next) => {
  Topic.find()
    .populate('owner')
    .then(topics => res.json({ topics: topics }))
    .catch(next)
})
// router.get(topics => {
//   return topics.map(topic => topic.toObject())
// })

// create
router.post('/topics', requireToken, (req, res, next) => {
  const topicData = req.body.topic
  topicData.owner = req.user.id
  Topic.create(topicData)
    .then(topic => res.status(201).json({ topic: topic.toObject() }))
    .catch(next)
})
// SHOW
router.get('/topics/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Topic.findById(id)
    .populate('owner')
    .then(handle404)
    .then(topic => res.json({ topic: topic }))
    .catch(next)
})
// delete
router.delete('/topics/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Topic.findById(id)
    .then(handle404)
    .then(topic => {
      topic.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// update
// router.patch('/topics/:id', requireToken, (req, res, next) => {
//   const id = req.params.id
//   const topicData = req.body.topic
//   Topic.findById(id)
//     .then(handle404)
//     .then(topic => requireOwnership(req, topic))
//     .then(topic => {
//       Object.assign(topic, topicData)
//       return topic.save()
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
module.exports = router
