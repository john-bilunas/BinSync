const express = require('express');
const app = express();
const PORT = 3000;

//routes
const inventoryRoute =  require('./routes/inventoryRoutes');



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/inventory', inventoryRoute);



// Global error handler

app.listen(PORT, () => {
    console.log('Server is up and running.')
    
});