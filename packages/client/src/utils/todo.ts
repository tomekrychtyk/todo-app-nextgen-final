import { TodoStatus } from '@/features/todo/interfaces';

export const getStatusBackground = (status: TodoStatus | undefined) => {
  switch (status) {
    case TodoStatus.toDo: {
      return 'gray';
    }

    case TodoStatus.inProgress: {
      return 'blueviolet';
    }

    case TodoStatus.done: {
      return 'yellowgreen';
    }

    default: {
      return '';
    }
  }
};
