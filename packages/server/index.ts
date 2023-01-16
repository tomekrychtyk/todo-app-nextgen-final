import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Todo } from './src/model/todo/Todo';

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders:
    'Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Origin,Cache-Control,Content-Type,X-Token,X-Refresh-Token',
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

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
    await todo.save();
    res.send(JSON.stringify('success'));
  } catch (error) {
    console.log('Error while saving a todo', error);
    res.status(500).send(error);
  }
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

app.patch('/todo', async (req: Request, res: Response) => {
  console.log('WORKING');
  res.status(200).send('ok');
});

// app.get('/find', async (req, res) => {
//   const todo = await Todo.findById('63c2251e40e0ea5959bf245e');
//   console.log(todo);

//   res.send('success');//
// });

// app.get('/add', async (req, res) => {
//   const result = await Todo.create({
//     title: 'siema 2',
//     status: 'done',
//     categories: [
//       {
//         id: 'abc',
//         name: 'Web Development',
//       },
//       {
//         id: 'hhh',
//         name: 'Important',
//       },
//     ],
//     project: {
//       id: 'react-adv',
//       name: 'Learn react hooks',
//     },
//   });
//   console.log(result);
//   res.send('success');
// });

const port = process.env.PORT || 8080;
app.listen(3000, () => {
  console.log('App is running on port:' + port);
});
