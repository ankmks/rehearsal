//new server.js for express-app

const express = require('express'),
                app = express();


                app.use('/', (request, response) => {
                    response.send('index page.');
                });


                app.listen(3000, console.log('Express  server started at port 3000'));