import mongodb from "mongodb"

// Create a reference to the ObjectId constructor which is used to generate and work with
// MongoDB's unique identifier for documents, which is known as an ObjectId
// We need ObjectId to convert an ID string to a MongoDB ObjectId later on.
const ObjectId = mongodb.ObjectId

// Create reviews variable
let reviews

// Create a class to access the reviews collection in the MongoDB database
export default class ReviewsDAO{
    // Create a static method to connect to the MongoDB database and retrieve the reviews collection
    static async injectDB(conn){
        try {
            // If the reviews variable is already defined (i.e., not falsy) then return
            if (reviews) {
                return
            }

            // Connect to the MongoDB database using the provided conn argument (which should be a valid MongoDB connection)
            // then accesses the 'reviews' collection from the specified database
            reviews = await conn.db(process.env.MOVIEREVIEW_NS).collection("reviews")
        } catch (error) {
            // Log error to console
            console.error(`ReviewDAO: Unable to connect: ${error}`)
        }
    }

    // Create a static method to add new review to the MongoDB database
    static async addReview(movieId, userInfo, review, date){
        try {
            // Create review object that will be created in the reviews collection
            const reviewObject = {
                name: userInfo.name,
                user_id: userInfo._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)
            }

            // Return the created object
            return await review.insertOne(reviewObject)
        } catch (err) {
            // Log error to console
            console.error(`Unable to add review: ${err}`)
            return {error: err}
        }
    }

    // Create a static method to update a review in the MongoDB database
    static async updateReview(userId, reviewId, review, date){
        try {
            // Create a filter to find the review to update
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId)
            }

            // Create a document that sets the updated review and date
            const updateReview = {
                $set: {
                    review: review,
                    date: date
                }
            }

            // Update the review in the reviews collection by using the filter and updateReview objects
            // and return it
            return await reviews.updateOne(filter, updateReview)
        } catch (err) {
            // Log error to console
            console.error(`Unable to update review: ${err}`)
            return {error: err}
        }
    }

    // Create a static method to delete a review from the MongoDB database
    static async deleteReview(userId, reviewId){
        try{
            // Create a filter to find the review to delete
            const filter = {
                user_id: userId,
                _id: ObjectId(reviewId)
            }

            // Delete the review from the reviews collection by using the filter
            // and return it
            return await reviews.deleteOne(filter)
        } catch (err) {
            // Log error to console
            console.error(`Unable to delete review: ${err}`)
            return {error: err}
        }
    }
}