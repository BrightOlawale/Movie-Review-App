// Import axios
import axios from 'axios';


// Create a MovieDataService class
export default class MovieDataService {
    // Create a constructor
    constructor() {
        // Set the base URL
        axios.defaults.baseURL = process.env.BASE_URL;
    }

    // Create a method to get all movies
    getAll(page = 0) {
        return axios.get(`/movies?page=${page}`);
    }

    // Create a method to get a movie by id
    get(id) {
        return axios.get(`/movies/id/${id}`);
    }

    // Find movies query
    find(query, by = "title", page = 0) {
        return axios.get(`/movies?${by}=${query}&page=${page}`);
    }

    // Create a method to create a review
    createReview(data) {
        return axios.post('/movies/reviews', data);
    }

    // Create a method to update a review
    updateReview(data) {
        return axios.put('/movies/reviews', data);
    }

    // Create a method to delete a review
    deleteReview(id, userId) {
        return axios.delete(`/movies/reviews?id=${id}`, {data: {user_id: userId}});
    }

    // Create a method to get all ratings
    getRatings() {
        return axios.get('/movies/ratings');
    }
    
}

