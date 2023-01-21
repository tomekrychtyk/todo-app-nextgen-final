import { Request, Response } from 'express';
import { Project } from '../model/project/Project';

export const getProjects = async (_: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body as typeof Project);
  try {
    await project.save();
    res.send(JSON.stringify(project));
  } catch (error) {
    console.log('Error while saving a project', error);
    res.status(500).send(error);
  }
};
