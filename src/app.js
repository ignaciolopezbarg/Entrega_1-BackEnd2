import express from 'express';
import { engine } from 'express-handlebars';
//import passport from 'passport';
//import initializePassport from './config/passport.config.js';
//import cookieParser from 'cookie-parser';
import viewsRouter from './routes/views.router.js';
//import sessionRouter from './routes/session.router.js';
const app = express();
const PORT = 8080;
import './database.js';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./src/public'))
//app.use(cookieParser());
//app.use(passport.initialize());
//initializePassport();

app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/',viewsRouter)
//app.use('/api/sessions', sessionRouter)


app.listen(PORT, () =>{
    console.log(`Servidor en el puerto ${PORT}`)
})