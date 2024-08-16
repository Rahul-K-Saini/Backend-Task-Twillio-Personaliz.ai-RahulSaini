// Import  modules
import postgres from 'postgres'
import "dotenv/config"

// Get the database connection string from environment variables
const connectionString = process.env.DATABASE_URL

// Create a new postgres client
const sql = postgres(connectionString)

// Export the sql client for use in other modules
export default sql

