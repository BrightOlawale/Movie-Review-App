import express from 'express'
import MovieController from './movies.controller.js'
import ReviewController from './reviews.controller.js'

// Get access to express router
const router = express.Router()

// Route to get a list of movies
router.route('/').get(MovieController.apiGetMovies)

// Route to post review, update review and delete review
router.route("/review")
            .post(ReviewController.apiPostReview)
            .put(ReviewController.apiUpdateReview)
            .delete(ReviewController.apiDeleteReview)

export default router
