import styles from './CoachDetails.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserCard from '~/components/UserCard';
import About from './components/About';

import { IoIosArrowBack } from 'react-icons/io';
import Photos from './components/Photos';
import TrainingCourse from './components/TrainingCourse';
import Feedback from './components/Feedback';
import Tabs from '~/components/Tabs';

const cx = classNames.bind(styles);
const CoachDetails = () => {
    const { currentUser } = useSelector((state) => state.user);
    const coach = {
        id: 1,
        fullname: 'Vinhh Tran',
        gender: 'Male',
        age: 18,
        email: 'aa@gmail.com',
        phoneNumber: '0123456789',
    };

    const tabs = [
        {
            label: 'Giới thiệu',
            content: <About />,
        },
        {
            label: 'Ảnh',
            content: <Photos />,
        },
        {
            label: 'Gói tập',
            content: <TrainingCourse />,
        },
        {
            label: 'Đánh giá',
            content: <Feedback />,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('back')}>
                <Link to={`/client/${currentUser.Id}/all-coaches`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </Link>
            </div>
            <div className={cx('content')}>
                <div className={cx('profile')}>
                    <UserCard user={coach} role="coach" />
                </div>
                <div className={cx('tabs')}>
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </div>
    );
};

export default CoachDetails;
