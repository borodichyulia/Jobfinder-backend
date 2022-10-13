import { body } from 'express-validator';

import { UserController } from '../controller/UserController';

const user = new UserController();
export const UserRoutes = [
  {
    method: 'post',
    route: '/registration',
    controller: UserController,
    action: user.registration,
    validation: [
      body('email').isEmail(),
      body('password').isLength({ min: 3, max: 32 }),
    ],
  },
  {
    method: 'get',
    route: '/activate/:link',
    controller: UserController,
    action: user.activate,
    validation: [],
  },
  {
    method: 'post',
    route: '/login',
    controller: UserController,
    action: user.login,
    validation: [],
  },
  {
    method: 'post',
    route: '/logout',
    controller: UserController,
    action: user.logout,
    validation: [],
  },
];
