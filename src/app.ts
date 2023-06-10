import express, { Application, Response, Request, NextFunction } from 'express';
import cors from 'cors';
const app: Application = express();
import usersRouter from './app/modules/users/users.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', usersRouter)


app.get('/', async (req: Request, res: Response) => {
    res.send('university management project is running')
})

//global error handler
app.use(globalErrorHandler)


export default app;

