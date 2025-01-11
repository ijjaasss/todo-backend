import express from 'express';
import connectDb from './config/db.js'; // Updated to use the correct function name
import dotenv from 'dotenv';
import authrout from './routing/authRout.js'
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config(); // Load environment variables
connectDb(); // Connect to the database
app.use(cors())
app.get('/', (req, res) => {
    res.send({ message: 'Welcome' }); // Corrected 'massege' to 'message'
});

app.use('/api/v1',authrout)

const port = process.env.PORT || 8080;
console.log(`Server will run on port: ${port}`);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
