import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()

app.use(cors({
  origin: '*'
}))

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
