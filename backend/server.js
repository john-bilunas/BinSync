const express = require('express');
const app = express();
const PORT = 3001;


app.use(express.json());       
app.use(express.urlencoded({ extended: true }));


//routes
const inventoryRoute =  require('./routes/inventoryRoutes');
const addressRoute =  require('./routes/addressRoutes');
const customerRoute = require('./routes/customerRoutes');
const bookingRoute = require('./routes/bookingRoutes');

app.get('/', (req, res) => {
    res.send('Hello World');  
});

app.use('/inventory', inventoryRoute);
app.use('/address', addressRoute);
app.use('/customer', customerRoute);
app.use('/booking', bookingRoute);

// Global error handler

//Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
    console.log('Server is up and running.')
    
});