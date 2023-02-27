import Home from '~/pages/Home';
/*-----pages-----*/
//Client
import CoachesView from '~/pages/Client/CoachesView';
import CoachDetails from '~/pages/Client/CoachDetails';
import ClientRequest from '~/pages/Client/ClientRequest';
import OnGoingCourse from '~/pages/Client/OnGoingCourse';
import HistoryCourse from '~/pages/Client/HistoryCourse';
import AccountInformation from '~/pages/Client/AccountInformation';
import Messages from '~/pages/Client/Messages';

//Coach
import CoachHome from '~/pages/Coach/Home/CoachHome';

//Guest
import GuestCoachesView from '~/pages/CoachesView/CoachesView'
import CoachDetail from '~/pages/CoachDetail/CoachDetail'

//Admin
import AdminCoachesView from '~/pages/Admin/CoachesView'

/*-----layouts-----*/
import AuthLayout from '~/layouts/AuthLayout';

const clientRoutes = [
    { path: '/client/:id/all-coaches', component: CoachesView, layout: AuthLayout },
    { path: '/client/:id/all-coaches/view-details/coach/:coachId', component: CoachDetails, layout: AuthLayout },
    { path: '/client/:id/request', component: ClientRequest, layout: AuthLayout },
    { path: '/client/:id/ongoing-course', component: OnGoingCourse, layout: AuthLayout },
    { path: '/client/:id/history-course', component: HistoryCourse, layout: AuthLayout },
    { path: '/client/:id/account-information', component: AccountInformation, layout: AuthLayout },
    { path: '/client/:id/messages', component: Messages, layout: AuthLayout },
];

const guestRoutes = [
    { path: '/coaches', component: GuestCoachesView },
    { path: '/coaches/:id', component: CoachDetail }
]
const coachRoutes = [{ path: '/coach/:id', component: CoachHome, layout: AuthLayout }];

const adminRoutes = [
    { path: '/admin/:id/all-coaches', component: AdminCoachesView, layout: AuthLayout }
]
export const routes = [{ path: '/', component: Home }, ...guestRoutes, ...clientRoutes, ...coachRoutes, ...adminRoutes];
