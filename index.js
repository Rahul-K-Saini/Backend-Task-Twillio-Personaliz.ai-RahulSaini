// Import  modules
import express from "express";
import "dotenv/config"
import { HandleGetHome, handleCreateContact, handleGetContact, handleUpdateContact, handleDeleteContact } from "./controllers/index.js";

// Initialize Express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.get('/', HandleGetHome);
app.post('/createContact', handleCreateContact);
app.get('/getContact', handleGetContact)
app.put('/updateContact', handleUpdateContact)
app.delete('/deleteContact', handleDeleteContact)

// Listen the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
