/*-----pages-----*/

//Guest
import Home from '~/pages/Guest/Home';
import CoachesView from '~/pages/Guest/CoachesView';
import CoachDetail from '~/pages/Guest/CoachDetails';
import CourseDetails from '~/pages/Guest/CourseDetails';
import Policy from '~/pages/Guest/Policy';

//Client
import ClientHome from '~/pages/Client/Home';
import TrainingRequest from '~/pages/Client/TrainingRequest';
import ClientCoachesView from '~/pages/Client/CoachesView';
import ClientCoachDetails from '~/pages/Client/CoachDetails';
import ClientCourseDetails from '~/pages/Client/CourseDetails';
import OnGoingCourse from '~/pages/Client/OnGoingCourse';
import ContractDetails from '~/pages/Client/ContractDetails';
import PendingCourse from '~/pages/Client/PendingCourse';
import PendingCourseDetails from '~/pages/Client/PendingCourseDetails';
import AccountProfile from '~/pages/Client/AccountProfile';
import TrainingHistory from '~/pages/Client/TrainingHistory';
import TrainingHistoryDetails from '~/pages/Client/TrainingHistoryDetails';
import Vouchers from '~/pages/Client/Vouchers';
import Messages from '~/pages/Client/Messages';

//Coach
import Verify from '~/pages/Coach/Verify';
import UpdateCertification from '~/pages/Coach/UpdateCertification';
import MyClient from '~/pages/Coach/MyClient';
import CoachingRequest from '~/pages/Coach/CoachingRequest';
import MyCourse from '~/pages/Coach/MyCourse';
import AddCourse from '~/pages/Coach/AddCourse';
import EditCourse from '~/pages/Coach/EditCourse';
import CoachContractDetails from '~/pages/Coach/ContractDetails';
import AddResource from '~/pages/Coach/AddResource';
import EditTrainingLog from '~/pages/Coach/EditTrainingLog';
import CoachAccountProfile from '~/pages/Coach/AccountProfile';
import Portfolio from '~/pages/Coach/Portfolio';
import UpdatePortfolio from '~/pages/Coach/UpdatePortfolio';
import UpdateImage from '~/pages/Coach/UpdateImage';

//Admin
import AdminCoachesView from '~/pages/Admin/CoachesView';
import VerifyCoach from '~/pages/Admin/VerifyCoach';
import CoachCertificate from '~/pages/Admin/CoachCertificate';
import Reports from '~/pages/Admin/Reports';
import ReportDetails from '~/pages/Admin/Reports/ReportDetails';
import CreateContract from '~/pages/Admin/Reports/ReportDetails/components/CreateContract';
import Voucher from '~/pages/Admin/Reports/ReportDetails/components/Voucher';
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
import Chat from '~/components/Chat/Chat';

//Guard
import RoleGuard from '~/components/Guards/RoleGuard';

const guestRoutes = [
    { path: '/', component: Home, layout: GuestLayout },
    { path: '/policy', component: Policy, layout: GuestLayout },
    { path: '/all-coaches', component: CoachesView, layout: GuestLayout },
    { path: '/all-coaches/view-details/coach/:coachId', component: CoachDetail, layout: GuestLayout },
    {
        path: '/all-coaches/view-details/coach/:coachId/course/:courseId',
        component: CourseDetails,
        layout: GuestLayout,
    },
    { path: '/view-details/coach/:coachId', component: CoachDetail, layout: GuestLayout },
    { path: '/view-details/coach/:coachId/course/:courseId', component: CourseDetails, layout: GuestLayout },
    { path: '/*', component: NotFound },
];

const clientRoutes = [
    { path: '/client/:id', component: ClientHome, layout: ClientLayout, guard: RoleGuard },
    { path: '/client/:id/all-coaches', component: ClientCoachesView, layout: ClientLayout, guard: RoleGuard },
    {
        path: '/client/:id/all-coaches/view-details/coach/:coachId',
        component: ClientCoachDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    {
        path: '/client/:id/all-coaches/view-details/coach/:coachId/course/:courseId',
        component: ClientCourseDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    {
        path: '/client/:id/view-details/coach/:coachId',
        component: ClientCoachDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    {
        path: '/client/:id/view-details/coach/:coachId/course/:courseId',
        component: ClientCourseDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    { path: '/client/:id/training-requests', component: TrainingRequest, layout: ClientLayout, guard: RoleGuard },
    { path: '/client/:id/ongoing-courses', component: OnGoingCourse, layout: ClientLayout, guard: RoleGuard },
    {
        path: '/client/:id/ongoing-courses/view-details/:contractId',
        component: ContractDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    { path: '/client/:id/pending-courses', component: PendingCourse, layout: ClientLayout, guard: RoleGuard },
    {
        path: '/client/:id/pending-courses/view-details/:contractId',
        component: PendingCourseDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    { path: '/client/:id/training-history', component: TrainingHistory, layout: ClientLayout, guard: RoleGuard },
    {
        path: '/client/:id/training-history/view-details/:contractId',
        component: TrainingHistoryDetails,
        layout: ClientLayout,
        guard: RoleGuard,
    },
    { path: '/client/:id/account-information', component: AccountProfile, layout: ClientLayout, guard: RoleGuard },
    { path: '/client/:id/all-messages', component: Messages, layout: ClientLayout, guard: RoleGuard },
    { path: '/client/:id/vouchers', component: Vouchers, layout: ClientLayout, guard: RoleGuard },
    { path: '/client/*', component: NotFound },
];

const coachRoutes = [
    { path: '/coach/:id/verify', component: Verify, layout: AuthLayout, guard: RoleGuard },
    {
        path: '/coach/:id/verify/update-certification',
        component: UpdateCertification,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    { path: '/coach/:id/my-clients', component: MyClient, layout: AuthLayout, guard: RoleGuard },
    {
        path: '/coach/:id/my-clients/view-details/:contractId',
        component: CoachContractDetails,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    {
        path: '/coach/:id/my-clients/view-details/:contractId/add-resource',
        component: AddResource,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    {
        path: '/coach/:id/my-clients/view-details/:contractId/edit/:logId',
        component: EditTrainingLog,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    { path: '/coach/:id/coaching-requests', component: CoachingRequest, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/my-courses', component: MyCourse, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/my-courses/add', component: AddCourse, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/my-courses/edit/:courseId', component: EditCourse, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/account-information', component: CoachAccountProfile, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/portfolio', component: Portfolio, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/portfolio/update-about', component: UpdatePortfolio, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/portfolio/update-images', component: UpdateImage, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/:id/messages', component: Messages, layout: AuthLayout, guard: RoleGuard },
    { path: '/coach/*', component: NotFound },
    { path: '/coach/:id/messages/:userId', component: Chat, layout: AuthLayout },
];

const adminRoutes = [
    { path: '/admin/:id/all-coaches', component: AdminCoachesView, layout: AuthLayout, guard: RoleGuard },
    { path: '/admin/:id/verify-coach', component: VerifyCoach, layout: AuthLayout, guard: RoleGuard },
    { path: '/admin/:id/verify-coach/:certId', component: CoachCertificate, layout: AuthLayout, guard: RoleGuard },
    { path: '/admin/:id/reports', component: Reports, layout: AuthLayout, guard: RoleGuard },
    {
        path: '/admin/:id/reports/:contractId/view-details/:reportId',
        component: ReportDetails,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    {
        path: '/admin/:id/reports/:contractId/view-details/:reportId/create-contract',
        component: CreateContract,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    { path: '/admin/:id/reports/:contractId/view-details/:reportId/voucher', component: Voucher, layout: AuthLayout },
    { path: '/admin/:id/profile', component: AdminAccountProfile, layout: AuthLayout, guard: RoleGuard },
    { path: '/admin/*', component: NotFound },
];

const superAdminRoutes = [
    {
        path: '/super_admin/:id/create-account/',
        component: SuperAdminCreateAccount,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    {
        path: '/super_admin/:id/account-profile/',
        component: SuperAdminAccountProfile,
        layout: AuthLayout,
        guard: RoleGuard,
    },
    { path: '/super_admin/:id/list-admin/', component: ListAdmin, layout: AuthLayout, guard: RoleGuard },
    { path: 'super_admin/*', component: NotFound },
];
export const routes = [...guestRoutes, ...clientRoutes, ...coachRoutes, ...adminRoutes, ...superAdminRoutes];
