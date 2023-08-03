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

// Route to get a specific movie by its id and all the reviews for it
router.route("/id/:id").get(MovieController.apiGetMovieById)

// Route to get a list of movie ratings such as G, G, R, etc. So that a user can select a rating from a dropdown menu in the UI
router.route("/ratings").get(MovieController.apiGetRatings)

export default router
