import { Request, Response } from 'express';

export const createNew = async (req: Request, res: Response) => {
  console.log(req.body);

  res.send(JSON.stringify('ok'));
};
