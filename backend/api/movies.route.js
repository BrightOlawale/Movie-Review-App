import express from 'express'
import MovieController from './movies.controller.js'

// Get access to express router
const router = express.Router()

//
router.route('/').get((req, res) => {
  res.send(MovieController.apiGetMovies)
})

export default router
