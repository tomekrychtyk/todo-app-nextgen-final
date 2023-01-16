import axios from 'axios';
import { ITodo } from '../interfaces';

const apiUrl = import.meta.env.VITE_API_URL;

export async function addTodo() {
  const result = await axios.post(`${apiUrl}/todo`, {
    title: 'siema',
  });
}
