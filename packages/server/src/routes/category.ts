import { Request, Response } from 'express';
import { Category } from '../model/category/Category';

export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const category = new Category(req.body as typeof Category);
  try {
    await category.save();
    res.send(JSON.stringify(category));
  } catch (error) {
    console.log('Error while saving a category', error);
    res.status(500).send(error);
  }
};
