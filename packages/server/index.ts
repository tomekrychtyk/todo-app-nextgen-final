import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { categoryRoutes } from './src/routes';
import { todoRoutes } from './src/routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;
const dbUri = process.env.MONGO_URI;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@${dbUri}/?retryWrites=true&w=majority`,
  (err: any) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log('👍 Successfully connected to the DB');
    }
  }
);

app.get('/', (req: Request, res: Response) => res.send('hi there'));

app.get('/todo', todoRoutes.getTodos);
app.post('/todo', todoRoutes.createTodo);
app.patch('/todo', todoRoutes.editTodo);
app.delete('/todo', todoRoutes.deleteTodo);
app.patch('/todo/status', todoRoutes.updateStatus);

app.post('/category', categoryRoutes.createNew);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App is running on port:' + port);
});
