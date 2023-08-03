import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MovieDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

// Main Function to help connect to our MongoDB cluster and call functions that access our database
async function main(){
    // Load Enviromental variable
    dotenv.config()

    // Create an instance of MongoClient and pass it to the database URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEW_DB_URI
    )

    // Retrieve Port number from enviromental variables, else use 8000
    const port = process.env.port || 8000

    // 
    try {
        // Connect to MongoDB cluster
        await client.connect()
        console.log(`DB Connected!`);

        // Get initial reference to the movies collection in the database.
        await MovieDAO.injectDB(client);

        // Get initial reference to the reviews collection in the database.
        await ReviewsDAO.injectDB(client);

        //
        app.listen(port, ()=>{
            console.log(`Server running on PORT: ${port}`);
        })
    } catch (error) {
        console.error("An error occurred during the application execution:", error);
        // If the MongoDB connection was established, close it
        if (client) {
            await client.close();
        }
        // Exit the application
        process.exit(1);
    }
}

main().catch(console.error);
