import Home from '~/pages/Home';
import ClientHome from '~/pages/Client/Home';
import CoachHome from '~/pages/Coach/Home/CoachHome';

//layouts
import AuthLayout from '~/layouts/AuthLayout';

const clientRoutes = [{ path: '/client/:id', component: ClientHome, layout: AuthLayout }];

const coachRoutes = [{ path: '/coach/:id', component: CoachHome, layout: AuthLayout }];

export const routes = [{ path: '/', component: Home }, ...clientRoutes, ...coachRoutes];
