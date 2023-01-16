import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Todo } from './src/model/todo/Todo';

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
      console.log('👍 Successfully connected with the DB');
    }
  }
);

app.get('/', (req: Request, res: Response) => res.send('hi'));

app.get('/todo', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/todo', async (req: Request, res: Response) => {
  const todo = new Todo(req.body as typeof Todo);
  try {
    const result = await todo.save();
    res.send(JSON.stringify(todo));
  } catch (error) {
    console.log('Error while saving a todo', error);
    res.status(500).send(error);
  }
});

app.patch('/todo', async (req: Request, res: Response) => {
  const { _id, title } = req.body as { _id: string; title: string };

  try {
    await Todo.findOneAndUpdate(
      { _id },
      {
        title,
      }
    );
  } catch (error) {
    console.log('Error updating todo status', error);
    res.status(500).send(error);
  }

  res.send('success');
});

app.delete('/todo', async (req: Request, res: Response) => {
  const { _id } = req.body as { _id: string };
  try {
    const todo = await Todo.deleteOne({ _id });
    res.send(JSON.stringify('success'));
  } catch (error) {
    console.log('Error while deleting a todo', error);
    res.status(500).send(error);
  }
});

app.patch('/todo/status', async (req: Request, res: Response) => {
  const { _id, status } = req.body as { _id: string; status: string };

  try {
    await Todo.findOneAndUpdate(
      { _id },
      {
        status,
      }
    );
  } catch (error) {
    console.log('Error updating todo status', error);
    res.status(500).send(error);
  }

  res.send('success');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App is running on port:' + port);
});
