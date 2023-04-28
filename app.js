import express from 'express';
import handlebars from 'express-handlebars';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import __dirname from './utils.js';
import viewsRouter from './routers/view.router.js'  
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, ()=> console.log("Listening on PORT 8080"));

const socketServer = new Server(httpServer);

socketServer.on ('connection', socket =>{
    console.log("Nuevo cliente conectado");
    socket.on ('message', data => {
        console.log(data)
    })
})

app.engine('handlebars', handlebars.engine());
app.set('view',__dirname +'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname +'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', viewsRouter);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
