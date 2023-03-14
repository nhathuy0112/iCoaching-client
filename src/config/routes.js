/*-----pages-----*/

//Guest
import Home from '~/pages/Guest/Home';
import GuestCoachesView from '~/pages/Guest/CoachesView';
import CoachDetail from '~/pages/Guest/CoachDetails';

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
import AdminCoachesView from '~/pages/Admin/CoachesView';
import VerifyCoach from '~/pages/Admin/VerifyCoach';
import CoachCertificate from '~/pages/Admin/VerifyCoach/CoachCertificate';
import Reports from '~/pages/Admin/Reports';
import ReportDetails from '~/pages/Admin/Reports/ReportDetails';
import AdminAccountProfile from '~/pages/Admin/AccountProfile';

//SuperAdmin
import ListAdmin from '~/pages/SuperAdmin/ListAdmin';
import SuperAdminCreateAccount from '~/pages/SuperAdmin/CreateAccount/CreateAccount';
import SuperAdminAccountProfile from '~/pages/SuperAdmin/AccountProfile/AccountProfile';

/*-----layouts-----*/
import AuthLayout from '~/layouts/AuthLayout';

const guestRoutes = [
    { path: '/', component: Home },
    { path: '/all-coaches', component: GuestCoachesView },
    { path: '/all-coaches/view-details/coach/:id', component: CoachDetail },
    { path: '/view-details/coach/:id', component: CoachDetail },
];

const clientRoutes = [
    { path: '/client/:id/all-coaches', component: CoachesView, layout: AuthLayout, isProtected: true },
    {
        path: '/client/:id/all-coaches/view-details/coach/:coachId',
        component: CoachDetails,
        layout: AuthLayout,
        isProtected: true,
    },
    { path: '/client/:id/request', component: ClientRequest, layout: AuthLayout, isProtected: true },
    { path: '/client/:id/ongoing-course', component: OnGoingCourse, layout: AuthLayout, isProtected: true },
    { path: '/client/:id/history-course', component: HistoryCourse, layout: AuthLayout, isProtected: true },
    { path: '/client/:id/account-information', component: AccountInformation, layout: AuthLayout, isProtected: true },
    { path: '/client/:id/messages', component: Messages, layout: AuthLayout, isProtected: true },
];

const coachRoutes = [
    { path: '/coach/:id/verify', component: Verify, layout: AuthLayout, isProtected: true },
    { path: '/coach/:id/my-clients', component: MyClient, layout: AuthLayout },
    { path: '/coach/:id/request-coaching', component: RequestCoaching, layout: AuthLayout, isProtected: true },
    { path: '/coach/:id/my-courses', component: MyCourse, layout: AuthLayout, isProtected: true },
    {
        path: '/coach/:id/account-information',
        component: CoachAccountInformation,
        layout: AuthLayout,
        isProtected: true,
    },
    { path: '/coach/:id/portfolio', component: Portfolio, layout: AuthLayout, isProtected: true },
    { path: '/coach/:id/messages', component: Messages, layout: AuthLayout, isProtected: true },
];

const adminRoutes = [
    { path: '/admin/:id/all-coaches', component: AdminCoachesView, layout: AuthLayout },
    { path: '/admin/:id/verify-coach', component: VerifyCoach, layout: AuthLayout },
    { path: '/admin/:id/verify-coach/:certId', component: CoachCertificate, layout: AuthLayout },
    { path: '/admin/:id/reports', component: Reports, layout: AuthLayout },
    { path: '/admin/:id/reports/:userId', component: ReportDetails, layout: AuthLayout },
    { path: '/admin/:id/profile', component: AdminAccountProfile, layout: AuthLayout },
];

const superAdminRoutes = [
    {
        path: '/super_admin/:id/create_account/',
        component: SuperAdminCreateAccount,
        layout: AuthLayout,
        isProtected: true,
    },
    {
        path: '/super_admin/:id/account_profile/',
        component: SuperAdminAccountProfile,
        layout: AuthLayout,
        isProtected: true,
    },
    { path: '/super_admin/:id/list_admin/', component: ListAdmin, layout: AuthLayout, isProtected: true },
];
export const routes = [...guestRoutes, ...clientRoutes, ...coachRoutes, ...adminRoutes, ...superAdminRoutes];
