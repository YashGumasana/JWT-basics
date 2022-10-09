import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import express from 'express';
const app = express();

import mainRouter from './routes/main.js'
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

//middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/app/v1', mainRouter);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 80;

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on port ${port}..`));
    } catch (error) {
        console.log(error);
    }
}

start();