import { FaUserShield, FaUserAlt, FaUserTie, FaBookReader } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';
import { MdMessage, MdReport, MdVerifiedUser } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';

export const coachNavLinks = [
    { url: 'verify', icon: <MdVerifiedUser />, name: 'Xác minh tài khoản' },
    { url: 'my-clients', icon: <FaUserAlt />, name: 'Khách hàng của tôi' },
    { url: 'coaching-requests', icon: <FaUserTie />, name: 'Yêu cầu huấn luyện' },
    { url: 'my-courses', icon: <CgGym />, name: 'Gói tập của tôi' },
    { url: 'account-information', icon: <IoMdSettings />, name: 'Thông tin tài khoản' },
    { url: 'portfolio', icon: <FaBookReader />, name: 'Hồ sơ năng lực' },
    { url: 'messages', icon: <MdMessage />, name: 'Tin nhắn' },
];

export const adminNavLinks = [
    { url: 'all-coaches', icon: <FaUserTie />, name: 'Huấn luyện viên' },
    { url: 'verify-coach', icon: <RiShieldCheckFill />, name: 'Xác minh chứng chỉ' },
    { url: 'reports', icon: <MdReport />, name: 'Giải quyết khiếu nại' },
    { url: 'profile', icon: <IoMdSettings />, name: 'Thông tin tài khoản' },
];

export const superAdminNavLinks = [
    { url: 'list-admin', icon: <FaUserShield />, name: 'Danh sách quản trị viên' },
    { url: 'create-account', icon: <FaUserTie />, name: 'Tạo tài khoản admin' },
    { url: 'account-profile', icon: <FaUserAlt />, name: 'Thông tin tài khoản' },
];
