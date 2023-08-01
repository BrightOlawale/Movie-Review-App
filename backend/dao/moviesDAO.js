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
};
