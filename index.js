// Libraries
const express = require('express')
const cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Constants
const app = express()
const port = process.env.PORT || 8000
const CMM_URI = "http://ceumass.eps.uspceu.es/mediator/api/v3/batch";

// Middlewares
app.use(express.json());
app.use(cors());

// Routing
app.get('/', (req, res) => {
  res.send('Fetch CMM API')
})

app.post('/get_cmm', async (req, res) => {

    const resCMM = await new Promise(res => {
        fetch(
            CMM_URI,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req.body)
            }
        ).then(value => res(value));
    });
    const resCMMJson = await resCMM.json();
    res.json(resCMMJson);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})