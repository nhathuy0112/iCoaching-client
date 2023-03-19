import { FaUserShield, FaUserAlt, FaUserTie, FaBookReader } from 'react-icons/fa';
import { CiSquareQuestion } from 'react-icons/ci';
import { CgGym } from 'react-icons/cg';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { BiHistory } from 'react-icons/bi';
import { MdMessage, MdReport, MdVerifiedUser } from 'react-icons/md';
import { RiShieldCheckFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';

export const superAdminNavLinks = [
    { url: 'list_admin', icon: <FaUserShield />, name: 'Kiểm duyệt viên' },
    { url: 'create_account', icon: <FaUserTie />, name: 'Tạo tài khoản admin' },
    { url: 'account_profile', icon: <FaUserAlt />, name: 'Thông tin tài khoản' },
];
export const clientNavLinks = [
    { url: 'all-coaches', icon: <FaUserTie />, name: 'Huấn luyện viên' },
    { url: 'request', icon: <CiSquareQuestion />, name: 'Yêu cầu tập luyện' },
    { url: 'ongoing-course', icon: <GiWeightLiftingUp />, name: 'Đang tập' },
    { url: 'history-course', icon: <BiHistory />, name: 'Lịch sử tập luyện' },
    { url: 'account-information', icon: <IoMdSettings />, name: 'Thông tin tài khoản' },
    { url: 'messages', icon: <MdMessage />, name: 'Tin nhắn' },
];

export const coachNavLinks = [
    { url: 'verify', icon: <MdVerifiedUser />, name: 'Xác minh tài khoản' },
    { url: 'my-clients', icon: <FaUserAlt />, name: 'Khách hàng của tôi' },
    { url: 'request-coaching', icon: <FaUserTie />, name: 'Yêu cầu huấn luyện' },
    { url: 'my-courses', icon: <CgGym />, name: 'Gói tập của tôi' },
    { url: 'account-information', icon: <IoMdSettings />, name: 'Thông tin tài khoản' },
    { url: 'portfolio', icon: <FaBookReader />, name: 'Hồ sơ năng lực' },
    { url: 'messages', icon: <MdMessage />, name: 'Tin nhắn' },
];

export const adminNavLinks = [
    { url: 'all-coaches', icon: <FaUserTie />, name: 'Huấn luyện viên' },
    { url: 'verify-coach', icon: <RiShieldCheckFill />, name: 'Xác minh tài khoản' },
    { url: 'reports', icon: <MdReport />, name: 'Giải quyết khiếu nại' },
    { url: 'profile', icon: <IoMdSettings />, name: 'Thông tin tài khoản' },
];
