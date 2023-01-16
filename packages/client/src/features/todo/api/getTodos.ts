import axios from 'axios';
import { ITodo } from '../interfaces';

const apiUrl = import.meta.env.VITE_API_URL;

export async function getTodos(): Promise<ITodo[]> {
  const result = await axios.get<ITodo[]>(`${apiUrl}/todo`);
  return result.data;
}
