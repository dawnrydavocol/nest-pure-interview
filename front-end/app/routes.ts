import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  index('./app/pages/interview-input/index.tsx'),
  // route('dashboard', './app/pages/dashboard/index.tsx'),
  // layout('./app/pages/layout.tsx', [
  //   route('login', './app/pages/auth/login.tsx'),
  //   route('register', './app/pages/auth/register.tsx'),
  // ]),
] satisfies RouteConfig;
