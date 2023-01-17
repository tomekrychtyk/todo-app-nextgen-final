import { useEffect } from 'react';
import { List, Alert, AlertTitle } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import Loading from '@/components/Loading/Loading';
import Todo from './Todo';
import { useGetTodosQuery } from './todoApi';
import { receivedTodos } from './todoSlice';
import { ITodo } from './interfaces';

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isUninitialized, isError } = useGetTodosQuery();
  const todos = useAppSelector((state) => {
    let filteredByCategory: ITodo[] = [];

    if (state.categories.selectedFilter === 'uncategorized') {
      filteredByCategory = state.todos.items.filter(
        (item) => item.category.name === '' || !item.category._id
      );
    } else if (state.categories.selectedFilter) {
      filteredByCategory = state.todos.items.filter(
        (item) => item.category._id === state.categories.selectedFilter
      );
    } else {
      filteredByCategory = state.todos.items;
    }

    if (state.todos.selectedStatus) {
      return filteredByCategory.filter(
        (todo) => todo.status === state.todos.selectedStatus
      );
    }

    return filteredByCategory;
  });

  useEffect(() => {
    if (data) {
      dispatch(receivedTodos(data));
    }
  }, [data]);

  if (isLoading || isUninitialized) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Alert severity='error' sx={{ mt: '8px' }}>
        <AlertTitle>Error fetching todos</AlertTitle>
        Please try again or contact the administrator
      </Alert>
    );
  }

  return (
    <List>
      {todos.map((todo) => {
        return <Todo key={todo._id} data={todo} />;
      })}
    </List>
  );
};

export default TodoList;
