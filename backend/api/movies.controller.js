import MovieDAO from "../dao/moviesDAO";

// Export MovieController class
export default class MovieController {
    // Create static method to handles the API request to get a list of movies
    static async apiGetMovies(req, res){
        // Check if moviesPerPage and page query parameters are present in the request query string
        // If they are not present, define thier values
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage, 10) : 20;
        const page = req.query.page ? parseInt(req.query.page, 10) : 0;

        // Create a filters object to store the db query parameters
        let filters = {};

        // Check if rated query parameter is present in the request query string
        // If it is present, add it to the filters object
        // Else chrck if title query parameter is present in the request query string
        // If it is present, add it to the filters object
        if (req.query.rated){
            filters.rated = req.query.rated;
        } else if (req.query.title){
            filters.title = req.query.title;
        }

        // Now pass the filters object to the getMovies static method of the MovieDAO class and store the returned object in moviesList
        // and totalNumMovies object variables
        const {moviesList, totalNumMovies} = await MovieDAO.getMovies({
            page,
            moviesPerPage,
            filters
        })

        // Now create a response object to send back to the client
        const response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies
        }

        // Send the response object back to the client
        res.json(response);
    }
}