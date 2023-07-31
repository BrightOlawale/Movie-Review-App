// Variable to store the reference to the MongoDB collection called 'movies'
let movies

// Create a class called MovieDAO that serves as a Data Access Object (DAO) for working with movies in a MongoDB database.
export default class MovieDAO{

    // Creating static method of the MovieDAO class.
    // NB: Static methods are associated with the class itself rather than the instances of the class. 
    //        The purpose of this method is to connect to the MongoDB database and retrieve the 'movies' collection.
    static async injectDB(conn){
        // If the 'movies' variable is already defined (i.e., not falsy)
        if (movies){
            return
        }

        // Attempt to connect to the MongoDB database and retrieve the 'movies' collection
        try {
            // connects to the MongoDB database using the provided conn argument (which should be a valid MongoDB connection)
            // then accesses the 'movies' collection from the specified database
            // and assigns the reference to the movies variable declared outside the class.
            movies = await conn.db(process.env.MOVIEREVIEW_NS).collection('movies');
        } catch (error) {
            console.error(`movieDAO: Unable to connect: ${error}`)
        }
    }
}
