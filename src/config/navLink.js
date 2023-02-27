import { FaUserTie, FaUserAlt } from 'react-icons/fa'
import { CiSquareQuestion } from 'react-icons/ci'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { BiHistory } from 'react-icons/bi'
import { MdMessage, MdReport } from 'react-icons/md'
import { RiShieldCheckFill } from 'react-icons/ri'

export const clientNavLinks = [
    { url: 'all-coaches', icon: <FaUserTie />, name: 'Huấn luyện viên' },
    { url: 'request', icon: <CiSquareQuestion />, name: 'Yêu cầu tập luyện' },
    { url: 'ongoing-course', icon: <GiWeightLiftingUp />, name: 'Đang tập' },
    { url: 'history-course', icon: <BiHistory />, name: 'Lịch sử tập luyện' },
    { url: 'account-information', icon: <FaUserAlt />, name: 'Thông tin tài khoản' },
    { url: 'messages', icon: <MdMessage />, name: 'Tin nhắn' }
]

export const coachNavLinks = [
    { url: 'verify', name: 'Xác minh tài khoản' },
    { url: 'my-client', name: 'Khách hàng của tôi' }
]

export const adminNavLinks = [
    { url: 'all-coaches', icon: <FaUserTie />, name: 'Huấn luyện viên' },
    { url: 'verify-coach', icon: <RiShieldCheckFill />, name: 'Xác minh tài khoản' },
    { url: 'reports', icon: <MdReport />, name: 'Giải quyết khiếu nại' },
    { url: 'account-information', icon: <FaUserAlt />, name: 'Thông tin tài khoản' },
]