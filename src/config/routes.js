/*-----pages-----*/

//Guest
import Home from '~/pages/Guest/Home';
import CoachesView from '~/pages/Guest/CoachesView';
import CoachDetail from '~/pages/Guest/CoachDetails';

//Client
import ClientHome from '~/pages/Client/Home';
import TrainingRequest from '~/pages/Client/TrainingRequest';
import ClientCoachesView from '~/pages/Client/CoachesView';
import ClientCoachDetails from '~/pages/Client/CoachDetails';
import OnGoingCourse from '~/pages/Client/OnGoingCourse';
import PendingCourse from '~/pages/Client/PendingCourse';
import ContractDetails from '~/pages/Client/ContractDetails';
import AccountProfile from '~/pages/Client/AccountProfile';
import TrainingHistory from '~/pages/Client/TrainingHistory';
import Messages from '~/pages/Client/Messages';

//Coach
import Verify from '~/pages/Coach/Verify';
import MyClient from '~/pages/Coach/MyClient';
import CoachingRequest from '~/pages/Coach/CoachingRequest';
import MyCourse from '~/pages/Coach/MyCourse';
import CoachContractDetails from '~/pages/Coach/ContractDetails';
import AddResource from '~/pages/Coach/AddResource';
import EditTrainingLog from '~/pages/Coach/EditTrainingLog';
import CoachAccountProfile from '~/pages/Coach/AccountProfile';
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

//Error
import NotFound from '~/pages/Errors/NotFound';

/*-----layouts-----*/
import GuestLayout from '~/layouts/GuestLayout';
import AuthLayout from '~/layouts/AuthLayout';
import ClientLayout from '~/layouts/ClientLayout';

const guestRoutes = [
    { path: '/', component: Home, layout: GuestLayout },
    { path: '/all-coaches', component: CoachesView, layout: GuestLayout },
    { path: '/all-coaches/view-details/coach/:coachId', component: CoachDetail, layout: GuestLayout },
    { path: '/view-details/coach/:coachId', component: CoachDetail, layout: GuestLayout },
    { path: '/*', component: NotFound },
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
    { path: '/client/:id/training-requests', component: TrainingRequest, layout: ClientLayout },
    { path: '/client/:id/ongoing-course', component: OnGoingCourse, layout: ClientLayout },
    { path: '/client/:id/ongoing-course/view-details/:contractId', component: ContractDetails, layout: ClientLayout },
    { path: '/client/:id/pending-course', component: PendingCourse, layout: ClientLayout },
    { path: '/client/:id/training-history', component: TrainingHistory, layout: ClientLayout },
    { path: '/client/:id/account-information', component: AccountProfile, layout: ClientLayout },
    { path: '/client/:id/all-messages', component: Messages, layout: ClientLayout },
    { path: '/client/*', component: NotFound },
];

const coachRoutes = [
    { path: '/coach/:id/verify', component: Verify, layout: AuthLayout },
    { path: '/coach/:id/my-clients', component: MyClient, layout: AuthLayout },
    { path: '/coach/:id/my-clients/view-details/:contractId', component: CoachContractDetails, layout: AuthLayout },
    { path: '/coach/:id/my-clients/view-details/:contractId/add-resource', component: AddResource, layout: AuthLayout },
    {
        path: '/coach/:id/my-clients/view-details/:contractId/edit/:logId',
        component: EditTrainingLog,
        layout: AuthLayout,
    },
    { path: '/coach/:id/coaching-requests', component: CoachingRequest, layout: AuthLayout },
    { path: '/coach/:id/my-courses', component: MyCourse, layout: AuthLayout },
    { path: '/coach/:id/account-information', component: CoachAccountProfile, layout: AuthLayout },
    { path: '/coach/:id/portfolio', component: Portfolio, layout: AuthLayout },
    { path: '/coach/:id/messages', component: Messages, layout: AuthLayout },
    { path: '/coach/*', component: NotFound },
];

const adminRoutes = [
    { path: '/admin/:id/all-coaches', component: AdminCoachesView, layout: AuthLayout },
    { path: '/admin/:id/verify-coach', component: VerifyCoach, layout: AuthLayout },
    { path: '/admin/:id/verify-coach/:certId', component: CoachCertificate, layout: AuthLayout },
    { path: '/admin/:id/reports', component: Reports, layout: AuthLayout },
    { path: '/admin/:id/reports/:userId', component: ReportDetails, layout: AuthLayout },
    { path: '/admin/:id/profile', component: AdminAccountProfile, layout: AuthLayout },
    { path: '/admin/*', component: NotFound },
];

const superAdminRoutes = [
    {
        path: '/super_admin/:id/create-account/',
        component: SuperAdminCreateAccount,
        layout: AuthLayout,
    },
    {
        path: '/super_admin/:id/account-profile/',
        component: SuperAdminAccountProfile,
        layout: AuthLayout,
    },
    { path: '/super_admin/:id/list-admin/', component: ListAdmin, layout: AuthLayout },
    { path: 'super_admin/*', component: NotFound },
];
export const routes = [...guestRoutes, ...clientRoutes, ...coachRoutes, ...adminRoutes, ...superAdminRoutes];
