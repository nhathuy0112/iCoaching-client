import styles from './CoachDetails.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './components/About';

import { IoIosArrowBack } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';

import Photos from './components/Photos';
import TrainingCourse from './components/TrainingCourses';
import Feedback from './components/Feedback';
import Tabs from '~/components/Tabs';

import { handleRenderGenders, handleRenderGenderClassNames } from '~/utils/gender';

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
        avatar: '../../../assets/images/photo1.jpg',
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
                <Link to={`/client/${currentUser?.Id}/all-coaches`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </Link>
            </div>
            <div className={cx('content')}>
                <div className={cx('profile')}>
                    <div className={cx('avatar')}>
                        {coach.avatar ? (
                            <img src={require('~/assets/images/coach-photo1.png')} className={cx('image')} />
                        ) : (
                            <FaUserCircle className={cx('default')} />
                        )}
                    </div>
                    <h2 className={cx('name')}>{coach.fullname}</h2>
                    <span className={cx(handleRenderGenderClassNames(coach.gender))}>
                        {handleRenderGenders(coach.gender)}
                    </span>
                    <span className={cx('age')}>{coach.age} tuổi</span>
                </div>
                <div className={cx('tabs')}>
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </div>
    );
};

export default CoachDetails;
