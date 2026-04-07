const app = require('../app.js');

const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        throw err
    }
    console.log(`listening at ${PORT}`)
})