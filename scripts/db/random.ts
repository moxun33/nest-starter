import { User } from '../../src/user/entities/user.entity';

import { Random, mock } from 'mockjs';

export const getInitUsers = () => {
  const admin = new User();
  admin.email = 'admin@admin.com';
  admin.username = 'admin';
  admin.password = 'admin111111';
  admin.isAdmin = 1;

  const user = new User();
  user.email = 'user@admin.com';
  user.username = 'user';
  user.password = 'user111111';
  user.isAdmin = 0;

  return [admin, user];
};
/*
export const getRandomUser = (todos?: Todo[]): User => {
  const user = new User();

  user.username = Random.cname();
  user.email = Random.email();
  user.password = '123456';
  user.is_admin = Random.natural(0, 1);
  user.todos = todos || [];

  return user;
};

export const getRandomTodo = (): Todo => {
  const todo = new Todo();

  todo.title = Random.ctitle();
  todo.description = Random.csentence();
  todo.status = mock({
    'array|1': [TodoStatus.TODO, TodoStatus.DONE],
  }).array;
  todo.media = Random.boolean()
    ? Random.image('200x200', '#02adea', '测试')
    : '';

  return todo;
};
*/
