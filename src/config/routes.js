import Home from '~/pages/Home';
import ClientHome from '~/pages/Client/Home';
import CoachHome from '~/pages/Coach/Home/CoachHome';
import ViewAllCoaches from '~/pages/CoachesView/CoachList'
import CoachDetail from '~/pages/CoachDetail/CoachDetail'
//layouts
import AuthLayout from '~/layouts/AuthLayout';
import GuestLayout from '~/layouts/GuestLayout';

const clientRoutes = [{ path: '/client/:id', component: ClientHome, layout: AuthLayout }];

const coachRoutes = [{ path: '/coach/:id', component: CoachHome, layout: AuthLayout }];

const guestCoachListRoutes = [{ path: '/coaches', component: ViewAllCoaches, layout: GuestLayout }];

const guestCoachDetailRoutes = [{ path: '/coaches/:id', component: CoachDetail, layout: GuestLayout }]

export const routes = [{ path: '/', component: Home }, ...clientRoutes, ...coachRoutes, ...guestCoachListRoutes, ...guestCoachDetailRoutes];
