import Home from '~/pages/Home';
import ClientHome from '~/pages/Client/Home';
import CoachHome from '~/pages/Coach/Home/CoachHome';
import ViewAllCoaches from '~/pages/CoachesView/CoachList'
//layouts
import AuthLayout from '~/layouts/AuthLayout';
import GuestLayout from '~/layouts/GuestLayout';

const clientRoutes = [{ path: '/client/:id', component: ClientHome, layout: AuthLayout }];

const coachRoutes = [{ path: '/coach/:id', component: CoachHome, layout: AuthLayout }];

const guestRoutes = [{ path: '/coaches', component: ViewAllCoaches, layout: GuestLayout }];

export const routes = [{ path: '/', component: Home }, ...clientRoutes, ...coachRoutes, ...guestRoutes];
