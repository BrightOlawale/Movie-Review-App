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
}