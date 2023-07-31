import express from "express";
import cors from "cors";
import movies from "./api/movies.route.js";


// Create instance of app
const app = express()

// Attach cors middleware and express.json middleware to the express server
// The use function registers a middleware with our Express application
app.use(cors())
app.use(express.json())

// NB: The JSON parsing middleware express.json enables the server to read and accept JSON in a request’s body.
//        Without this middleware, data retrieval would be much more difficult.

// NB: The general convention for API URLs is to begin it with /api/<version number>


app.use("/api/v1/movies", movies)

// Here is a the wild card route that returns a 404 page with a "Not Found" message, if someone tries to go to a route that doesn’t exist
app.use("*", (req, res) => {
    res.status(404).json({
        error: "Not Found"
    })
});

export default app;