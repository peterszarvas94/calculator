import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { readFile, writeFile } from 'fs';
import path from 'path';
const dbFilePath = path.join(__dirname, '../db.txt');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(json());
app.use(urlencoded({
  extended: true
}));

// error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    message: "Something went wrong",
    data: err
  });
});

// POST
app.post('/api/memory', (req: Request, res: Response, next: NextFunction) => {
  const { memory }: { memory: string } = req.body;
  writeFile(dbFilePath, memory.toString(), (err) => {
    if (err) {
      return next(err);
    }
    return res.json({
      message: "memory saved",
      data: memory
    });
  });
});


// GET
app.get('/api/memory', (_req: Request, res: Response, next: NextFunction) => {
  readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      return next(err);
    }
    res.json({
      message: "get memory",
      data
    });
  });
});

// start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
