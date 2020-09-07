const express = require('express');
const path = require('path');
const routes = require('./Webapp/Routes/routes');

const app =  express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies
app.use(express.static('Webapp/Resources'));
app.use(routes);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/Webapp/Views'));

app.listen(port, () => {
  console.log(`Web server listening on port ${port}.`);
});
