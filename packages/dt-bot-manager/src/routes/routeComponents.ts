import { lazy } from 'react';

const Login = lazy(() => import('@/pages/login'));
const Register = lazy(() => import('@/pages/register'));
const Page404 = lazy(() => import('@/pages/page404'));

/**
 * layout相关组件*/
const Layout = lazy(() => import('@/pages/layout'));
const Dashboard = lazy(() => import('@/pages/dashboard'));

const About = lazy(() => import('@/pages/about'));

export { Login, Register, Dashboard, Page404, Layout, About };
