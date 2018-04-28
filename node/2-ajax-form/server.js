const express = require('express'),
app = express(),
bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.set('port', process.env.PORT || 3000);

app.get('/', (request,response) => {
    response.sendFile(__dirname + '/form.html');
});

app.post('/',(request, response) => {
    if(request.xhr || request.accepts('json, html') == 'json'){
        response.send({message: 'It works'});
        
    }
    else{}
});


app.listen(3000, () =>{
    console.log('Express server stated at port 3000');
});