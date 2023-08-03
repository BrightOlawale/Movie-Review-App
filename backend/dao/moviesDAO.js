import mongodb from 'mongodb'

// Create a variable to store a reference to the MongoDB ObjectId class
const ObjectId = mongodb.ObjectId

// Variable to store the reference to the MongoDB collection called 'movies'
let movies

// Create a class called MovieDAO that serves as a Data Access Object (DAO) for working with movies in a MongoDB database.
export default class MovieDAO {
  // Creating static method of the MovieDAO class.
  // NB: Static methods are associated with the class itself rather than the instances of the class.
  //        The purpose of this method is to connect to the MongoDB database and retrieve the 'movies' collection.
  static async injectDB (conn) {
    // If the 'movies' variable is already defined (i.e., not falsy)
    if (movies) {
      return
    }

    // Attempt to connect to the MongoDB database and retrieve the 'movies' collection
    try {
      // connects to the MongoDB database using the provided conn argument (which should be a valid MongoDB connection)
      // then accesses the 'movies' collection from the specified database
      // and assigns the reference to the movies variable declared outside the class.
      movies = await conn.db(process.env.MOVIEREVIEW_NS).collection('movies')
    } catch (error) {
      console.error(`movieDAO: Unable to connect: ${error}`)
    }
  }

  // Creating static method of the MovieDAO class to get all movies from the MongoDB database.
  static async getMovies ({
    // The following are default destructured parameters. Empty object is passed in as default value for the parameter
    page = 0,
    moviesPerPage = 20, // i.e 20 movies per page
    filters = null
  } = {}) {
    // Create a query object to filter the movies collection
    let query

    // If filters object is not null, then create a query object to filter the movies collection
    if (filters) {
      // Check If title is present in the filters object, it means the user wants to filter movies by title
      if ('title' in filters) {
        // MongoDB query is set to perform a text search using the $text operator.
        query = { $text: { $search: filters.title } }
      } else if ('rated' in filters) {
        // If rated is present, it means the user wants to filter movies by the rated field.
        query = { rated: { $eq: filters.rated } }
      }
    }

    // Create cursor variable to store the reference to the MongoDB query
    let cursor
    try {
      // Find all movies that match the query then limit the number of movies returned to the moviesPerPage value
      // and skip the number of movies returned to the moviesPerPage value multiplied by the page value
      cursor = await movies.find(query)
        .limit(moviesPerPage)
        .skip(moviesPerPage * page)

      // Convert the cursor to an array of movies
      const moviesList = await cursor.toArray()

      // Retrieve the total number of movies that match the specified query.
      // This is useful for pagination and informing the client how many total movies are available based on the given filters
      const totalNumMovies = await movies.countDocuments(query)

      // Return an object of movie list (an array) and total number of movies that match the query
      return { moviesList, totalNumMovies }
    } catch (error) {
      console.error(`Unable to find movie: ${error}`)
      return { moviesList: [], totalNumMovies: 0 }
    }
  }

  // Creating static method of the MovieDAO class to get a list of movie ratings from the MongoDB database.
  static async getRatings () {
    try{
      // Create variable of empty array to store the list of the kinds of ratings available for movies
      let ratings = []

      // Use the distinct method to retrieve the list of the kinds of ratings available for movies
      ratings = await movies.distinct("rated")

      // Return the array of ratings
      return ratings
    } catch (error) {
      // Log error to console and return rating as empty array
      console.error(`Unable to get ratings: ${error}`)
      return ratings
    }
  }

  // Creating static method of the MovieDAO class to get a movie by its id from the MongoDB database.
  static async getMovieById (id) {
    try {
      // We will use aggregation pipeline to retrieve a movie by its id
      // The aggregation pipeline is a framework for data aggregation modeled on the concept of data processing pipelines.
      // Documents enter a multi-stage pipeline that transforms the documents into an aggregated result.
      // For example, a pipeline could include a stage for filtering documents, a stage for grouping documents,
      // a stage for summing grouped values, and so on.
      // The pipeline provides efficient data aggregation using native operations within MongoDB,
      // and is the preferred method for data aggregation in MongoDB.
      // The aggregation pipeline can operate on a sharded collection.
      // The aggregation pipeline processes documents in stages.
      // Pipeline stages do not need to produce one output document for every input document;
      // e.g., some stages may generate new documents or filter out documents.


      // NB: Here we are using the $match and $lookup operators to retrieve a movie by its id.
      // The $match operator filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage.
      // The $lookup operator performs a left outer join to an unsharded collection in the same database to filter in documents from the “joined” collection for processing.

      // In the first stage of the pipeline, we use the $match operator to find the movie by its id
      // and assign the result to the variable called pipeline
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id)
          }
        },
        {
          // In the second stage of the pipeline, we use the $lookup operator to join the movies collection with the reviews collection
          // and assign the result to the variable called pipeline
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'movie_id',
            as: 'reviews'
          }
        },
      ]

      // We use the aggregate method to perform the aggregation pipeline on the movies collection
      // and call the next method  returns the first document that matches the _id provided. 
      // This is because _id is unique, and we expect at most one match.
      // and return the result
      return await movies.aggregate(pipeline).next()
    } catch(error) {
      console.error(`Unable to get movie: ${error}`)
      return null
    }
  }
};
