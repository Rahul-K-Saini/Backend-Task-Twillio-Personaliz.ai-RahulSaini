import sql from '../db.js';

// Function to create a new contact
export const handleCreateContact = async (req, res) => {
    const { first_name, last_name, email, mobile_number } = req.body;
    const newContact = { first_name, last_name, email, mobile_number };
    try {
        // Insert the new contact into the database
        await sql`
             insert into contacts (first_name, last_name,email,mobile_number)
             values (${first_name}, ${last_name},${email},${mobile_number})
         `
        return res.send(newContact);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
}

// Function to get a contact by ID
export const handleGetContact = async (req,res) => {
    const {contact_id} = req.body;
    try {
       // Fetch the contact from the database
       const contact =  await sql`select * from contacts where id = ${contact_id}`
       return res.status(200).send(contact);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
}

// Function to update a contact
export const handleUpdateContact = async(req,res)=>{
    const {contact_id,first_name,last_name,email,mobile_number} = req.body;
    try {
        // Update the contact in the database
        const contact = await sql`update contacts set first_name = ${first_name},last_name = ${last_name},email = ${email},mobile_number = ${mobile_number} where id = ${contact_id}`
        return res.status(200).send("Contac updated successfully");
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
}

// Function to delete a contact
export const handleDeleteContact = async(req,res)=>{
    const {contact_id} = req.body;
    try {
        // Delete the contact from the database
        const contact = await sql`delete from contacts where id = ${contact_id}`
        return res.status(200).send("Contact Deleted Successfully");
    }
    catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
}