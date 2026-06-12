const app = require('../app.js');
require('dotenv/config');

const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`listening at ${PORT}`)
})


