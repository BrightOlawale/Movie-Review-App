import express from 'express'
import MovieController from './movies.controller.js'

// Get access to express router
const router = express.Router()

// Index page
router.route('/').get(MovieController.apiGetMovies)

export default router
