const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Conexión a Mongo DB
const dbConnMongo = require('./util/mongo');
dbConnMongo();



const errorController = require('./controllers/error');
const startSessionRoute = require('./routes/startSession');
const myProfileRoute = require('./routes/myProfile');
const storyRoute = require('./routes/story');
const generalRoute = require('./routes/general');

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
// Para que el cliente pueda tener acceso al css y a las imágenes
app.use(express.static(path.join(__dirname, 'public')));


app.use(generalRoute);
app.use(startSessionRoute);
app.use(storyRoute);
app.use('/myProfile', myProfileRoute);
app.use(errorController.get404); // Se llama así ya que no tiene enrutador

app.listen(3000);