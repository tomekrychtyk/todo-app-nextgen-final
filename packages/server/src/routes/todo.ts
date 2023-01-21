import { Request, Response } from 'express';
import { Todo } from '../model/todo/Todo';
import { Project } from '../model/project/Project';

export const getTodos = async (_: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const todo = new Todo(req.body as typeof Todo);
  try {
    await todo.save();
    res.send(JSON.stringify(todo));
  } catch (error) {
    console.log('Error while saving a todo', error);
    res.status(500).send(error);
  }
};

export const editTodo = async (req: Request, res: Response) => {
  const { _id, title, project } = req.body as {
    _id: string;
    title: string;
    project: typeof Project;
  };

  try {
    await Todo.findOneAndUpdate(
      { _id },
      {
        title,
        project,
      }
    );

    res.send('success');
  } catch (error) {
    console.log('Error updating todo status', error);
    res.status(500).send(error);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { _id } = req.body as { _id: string };
  try {
    await Todo.deleteOne({ _id });
    res.send(JSON.stringify('success'));
  } catch (error) {
    console.log('Error while deleting a todo', error);
    res.status(500).send(error);
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  const { _id, status } = req.body as { _id: string; status: string };

  try {
    await Todo.findOneAndUpdate(
      { _id },
      {
        status,
      }
    );

    res.send('success');
  } catch (error) {
    console.log('Error updating todo status', error);
    res.status(500).send(error);
  }
};
