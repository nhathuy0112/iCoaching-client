/*-----pages-----*/

//Guest
import Home from '~/pages/Guest/Home';
import CoachesView from '~/pages/Guest/CoachesView';
import CoachDetail from '~/pages/Guest/CoachDetails';

//Client
import ClientHome from '~/pages/Client/Home';
import TrainingRequest from '~/pages/Client/TrainingRequest';
import TrainingHistory from '~/pages/Client/TrainingHistory';
import ClientCoachesView from '~/pages/Client/CoachesView';
import ClientCoachDetails from '~/pages/Client/CoachDetails';
import OnGoingCourse from '~/pages/Client/OnGoingCourse';
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
import AdminCoachesView from '~/pages/Admin/CoachesView';
import VerifyCoach from '~/pages/Admin/VerifyCoach';
import CoachCertificate from '~/pages/Admin/VerifyCoach/CoachCertificate';
import Reports from '~/pages/Admin/Reports';
import ReportDetails from '~/pages/Admin/Reports/ReportDetails';

//SuperAdmin
import ListAdmin from '~/pages/SuperAdmin/ListAdmin';
import SuperAdminCreateAccount from '~/pages/SuperAdmin/CreateAccount/CreateAccount';
import SuperAdminAccountProfile from '~/pages/SuperAdmin/AccountProfile/AccountProfile';

/*-----layouts-----*/
import AuthLayout from '~/layouts/AuthLayout';
import ClientLayout from '~/layouts/ClientLayout';

const guestRoutes = [
    { path: '/', component: Home },
    { path: '/all-coaches', component: CoachesView },
    { path: '/all-coaches/view-details/coach/:id', component: CoachDetail },
    { path: '/view-details/coach/:id', component: CoachDetail },
];

const clientRoutes = [
    { path: '/client/:id', component: ClientHome, layout: ClientLayout },
    { path: '/client/:id/all-coaches', component: ClientCoachesView, layout: ClientLayout },
    {
        path: '/client/:id/all-coaches/view-details/coach/:coachId',
        component: ClientCoachDetails,
        layout: ClientLayout,
    },
    { path: '/client/:id/view-details/coach/:coachId', component: ClientCoachDetails, layout: ClientLayout },
    { path: '/client/:id/training-request', component: TrainingRequest, layout: ClientLayout },
    { path: '/client/:id/ongoing-course', component: OnGoingCourse, layout: ClientLayout },
    { path: '/client/:id/training-history', component: TrainingHistory, layout: ClientLayout },
    { path: '/client/:id/account-information', component: AccountInformation, layout: ClientLayout },
    { path: '/client/:id/all-messages', component: Messages, layout: ClientLayout },
];

const coachRoutes = [
    { path: '/coach/:id/verify', component: Verify, layout: AuthLayout },
    { path: '/coach/:id/my-clients', component: MyClient, layout: AuthLayout },
    { path: '/coach/:id/request-coaching', component: RequestCoaching, layout: AuthLayout },
    { path: '/coach/:id/my-courses', component: MyCourse, layout: AuthLayout },
    { path: '/coach/:id/account-information', component: CoachAccountInformation, layout: AuthLayout },
    { path: '/coach/:id/portfolio', component: Portfolio, layout: AuthLayout },
    { path: '/coach/:id/messages', component: Messages, layout: AuthLayout },
];

const adminRoutes = [
    { path: '/admin/:id/all-coaches', component: AdminCoachesView, layout: AuthLayout },
    { path: '/admin/:id/verify-coach', component: VerifyCoach, layout: AuthLayout },
    { path: '/admin/:id/verify-coach/:certId', component: CoachCertificate, layout: AuthLayout },
    { path: '/admin/:id/reports', component: Reports, layout: AuthLayout },
    { path: '/admin/:id/reports/:userId', component: ReportDetails, layout: AuthLayout },
];

const superAdminRoutes = [
    {
        path: '/super_admin/:id/create_account/',
        component: SuperAdminCreateAccount,
        layout: AuthLayout,
    },
    {
        path: '/super_admin/:id/account_profile/',
        component: SuperAdminAccountProfile,
        layout: AuthLayout,
    },
    { path: '/super_admin/:id/list_admin/', component: ListAdmin, layout: AuthLayout },
];
export const routes = [...guestRoutes, ...clientRoutes, ...coachRoutes, ...adminRoutes, ...superAdminRoutes];
