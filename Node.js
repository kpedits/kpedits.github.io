const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { input } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: input }],
            }),
        });

        const data = await response.json();
        res.json({ output: data.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
