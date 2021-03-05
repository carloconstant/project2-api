const express = require('express')
const passport = require('passport')

const Comment = require('../models/comment')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.require
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', {session: false})
const router = express.Router()

// INDEX
router.get('/comments', requireToken, (req, res, next) => {
  const userId = req.user.id
  Comment.find({ owner: userId })
    .then(comments => res.json(comments))
    .catch(next)
})

// create
router.post('/comments', requireToken, (req, res, next) => {
  const comment = req.body.comment
  comment.owner = req.user.id
  Comment.create(comment)
    .then(comment => res.status(201).json({ comment: comment.toObject() }))
    .catch(next)
})
// SHOW
router.get('/comments/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Comment.findById(id)
    .populate('owner')
    .then(handle404)
    .then(comment => res.json({ comment: comment }))
    .catch(next)
})
// delete
router.delete('/comments/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Comment.findById(id)
    .then(handle404)
    .then(comment => {
      comment.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// update
router.patch('/comments/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  const commentData = req.body.comment
  Comment.findById(id)
    .then(handle404)
    .then(comment => requireOwnership(req, comment))
    .then(comment => {
      Object.assign(comment, commentData)
      return comment.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
module.exports = router
