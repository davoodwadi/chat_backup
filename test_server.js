// server.js
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
const port = 3000;

// app.use(cors(
//     {
//         origin: 'http://127.0.0.1:3000'
//     }
// ));
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());
const openai = new OpenAI()


// Endpoint to handle OpenAI API requests
app.post('/api/openai/completions', async (req, res) => {
    try {
        const { messages, model, max_tokens } = req.body;
        console.log(model);
        const completion = await openai.chat.completions.create({
            messages,
            model,
            max_tokens
        });

        res.json(completion.choices[0]);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
