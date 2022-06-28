import { UserController } from '../controller/UserController';

const user = new UserController();
export const UserRoutes = [
  {
    method: 'post',
    route: '/registration',
    controller: UserController,
    action: user.registration,
  },
  {
    method: 'get',
    route: '/activate/:link',
    controller: UserController,
    action: user.activate,
  },
  {
    method: 'post',
    route: '/login',
    controller: UserController,
    action: user.login,
  },
];
