import ReviewsDAO from '../dao/reviewsDAO.js'

// Export ReviewController class
export default class ReviewController {
    // Create static method to handles the API request to post a review
    static async apiPostReview(req, res) {
        try {
            // First we retrieve the movie_id, review and user_info from the request body
            const movieId = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            // Create date object for the review
            const date = new Date()

            // Now pass the movie_id, review, userInfo and date to the addReview static method of the ReviewsDAO class
            // and store the returned object in reviewResponse object variable
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                review,
                userInfo,
                date
            )

            // Now create a response object to send back to the client if query was successful
            const response = {
                status: "success",
                review: reviewResponse
            }

            // Send the response object back to the client ans send status code
            res.status(201).json(response)
        } catch (err) {
            // If there is an error, log it to the console and send a response to the client
            console.error(`Error while processing the request: ${error}`)
            res.status(500).json({ error: err.message })
        }
    }

    // Create static method to handles the API request to update a review
    static async apiUpdateReview(req, res) {
        try {
            // Retrieve reviewId and review from the request body
            const reviewId = req.body.review_id
            const review = req.body.review

            // Create date object for review
            const date = new Date()

            // Now pass the reviewId, review and date to the updateReview static method of the ReviewsDAO class
            // and store the returned object in reviewResponse object variable
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                review,
                date
            )

            // Check if reviewResponse object variable returned from the ReviewsDAO class is null
            // If it is null, send a response to the client
            if (reviewResponse.error) {
                res.status(400).json({ error: reviewResponse.error })
            }

            // Check if a review was actually updated by checking the modifiedCount property of the reviewResponse object variable
            // If it is 0, send a response to the client
            if (reviewResponse.modifiedCount === 0) {
                res.status(400).json({
                    error: "Unable to update review - user may not be original poster"
                })
            }

            // Now create a response object to send back to the client if query was successful
            const response = {
                status: "success",
                review: reviewResponse
            }

            // Send the response object back to the client ans send status code
            res.status(200).json(response)
        } catch (err) {
            // If there is an error, log it to the console and send a response to the client
            console.error(`Error while processing the request: ${err}`)
            res.status(500).json({ error: err.message })
        }
    }

    // Create static method to handles the API request to delete a review
    static async apiDeleteReview(req, res) {
        try {
            // Retrieve reviewId and userId from the request body
            const reviewId = req.body.review_id
            const userId = req.body.user_id

            // Now, pass the reviewId and userId to the deleteReview static method of the ReviewsDAO class
            // and store the returned object in reviewResponse object variable
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userId)

            // Create a response object to send back to the client if query was successful
            const response = {
                status: "success"
            }

            // Send the response object back to the client ans send status code
            res.status(200).json(response)
        } catch (err) {
            // If there is an error, log it to the console and send a response to the client
            console.error(`Error while processing the request: ${err}`)
            res.status(500).json({ error: err.message })
        }
    }
}