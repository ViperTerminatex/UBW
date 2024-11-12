const express = require('express');
const request = require('request');
const app = express();

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL parameter is required');
    }
    request(url).pipe(res); // Forward the content from the URL to the client
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
