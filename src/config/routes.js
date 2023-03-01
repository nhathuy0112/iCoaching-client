/*-----pages-----*/

//Guest
import Home from '~/pages/Guest/Home';
import GuestCoachesView from '~/pages/Guest/CoachesView'
import CoachDetail from '~/pages/Guest/CoachDetails'

//Client
import CoachesView from '~/pages/Client/CoachesView';
import CoachDetails from '~/pages/Client/CoachDetails';
import ClientRequest from '~/pages/Client/ClientRequest';
import OnGoingCourse from '~/pages/Client/OnGoingCourse';
import HistoryCourse from '~/pages/Client/HistoryCourse';
import AccountInformation from '~/pages/Client/AccountInformation';
import Messages from '~/pages/Client/Messages';

//Coach
import Verify from '~/pages/Coach/Verify';
import MyClient from '~/pages/Coach/MyClient';
import RequestCoaching from '~/pages/Coach/RequestCoaching';
import MyCourse from '~/pages/Coach/MyCourse';
import CoachAccountInformation from '~/pages/Coach/AccountInformation';
import Portfolio from '~/pages/Coach/Portfolio';


//Admin
import AdminCoachesView from '~/pages/Admin/CoachesView'

/*-----layouts-----*/
import AuthLayout from '~/layouts/AuthLayout';


const guestRoutes = [
    { path: '/', component: Home },
    { path: '/all-coaches', component: GuestCoachesView },
    { path: '/all-coaches/view-details/coach/:id', component: CoachDetail },
    { path: '/view-details/coach/:id', component: CoachDetail }
];

const clientRoutes = [
    { path: '/client/:id/all-coaches', component: CoachesView, layout: AuthLayout },
    { path: '/client/:id/all-coaches/view-details/coach/:coachId', component: CoachDetails, layout: AuthLayout },
    { path: '/client/:id/request', component: ClientRequest, layout: AuthLayout },
    { path: '/client/:id/ongoing-course', component: OnGoingCourse, layout: AuthLayout },
    { path: '/client/:id/history-course', component: HistoryCourse, layout: AuthLayout },
    { path: '/client/:id/account-information', component: AccountInformation, layout: AuthLayout },
    { path: '/client/:id/messages', component: Messages, layout: AuthLayout },
];

const coachRoutes = [
    { path: '/coach/:id/verify', component: Verify, layout: AuthLayout },
    { path: '/coach/:id/my-clients', component: MyClient, layout: AuthLayout },
    { path: '/coach/:id/request-coaching', component: RequestCoaching, layout: AuthLayout },
    { path: '/coach/:id/my-courses', component: MyCourse, layout: AuthLayout },
    { path: '/coach/:id/account-information', component: CoachAccountInformation, layout: AuthLayout },
    { path: '/coach/:id/portfolio', component: Portfolio, layout: AuthLayout },
    { path: '/coach/:id/messages', component: Messages, layout: AuthLayout }
];

const adminRoutes = [
    { path: '/admin/:id/all-coaches', component: AdminCoachesView, layout: AuthLayout }
]
export const routes = [{ path: '/', component: Home }, ...guestRoutes, ...clientRoutes, ...coachRoutes, ...adminRoutes];
