import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

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

        //
        app.listen(port, ()=>{
            console.log(`Server running on PORT: ${port}`);
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main().catch(console.error);
