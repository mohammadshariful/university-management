import express, { Application, Response, Request } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing
app.get('/', (req: Request, res: Response) => {
    res.send('Working Successful')
})


export default app;