import ReviewsDAO from '../dao/reviewsDAO.js'

// Export ReviewController class
export default class ReviewController {
    // Create static method to handles the API request to post a review
    static async apiPostReview(req, res, next) {
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
            const reviewResponse = await ReviewsDAO.addReview({
                movieId,
                review,
                userInfo,
                date
            })

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
}