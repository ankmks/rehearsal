//new server.js for express-app

const express = require('express'),
                app = express();

bodyParser = require('body-parser');

//body parser for parse from post method to aviable in request.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.set('port', process.env.PORT || 3000);


app.get('/', (request, response) =>{
    response.sendFile(__dirname+ '/form.html');
});

app.post('/', (request, response) => {

    console.log(request.body);
    response.send(`${request.body.name} said ${request.body.message}`);

});

app.listen(3000, () => {
    console.log('Express serer started at port 3000');
});