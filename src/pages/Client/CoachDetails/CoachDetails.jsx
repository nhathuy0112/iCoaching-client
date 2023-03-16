import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachDetails.module.scss';

import Tabs from '~/components/Tabs/Tabs';
import AboutMe from './components/AboutMe';
import CoachPhoto from './components/CoachPhoto';
import TrainingCourse from './components/TrainingCourse';
import { handleRenderGenderClassNames, handleRenderGenders } from '~/utils/gender';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachProfileAsync } from '~/features/guestSlice';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';

const cx = classNames.bind(styles);
const CoachDetail = () => {
    const tabs = [
        {
            label: 'Giới thiệu',
            content: <AboutMe />,
        },
        {
            label: 'Ảnh',
            content: <CoachPhoto />,
        },
        {
            label: 'Gói tập',
            content: <TrainingCourse />,
        },
    ];
    const { coachId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentCoach } = useSelector((state) => state.guest);

    // console.log(coachId);

    useEffect(() => {
        dispatch(getCoachProfileAsync(coachId));
    }, [dispatch, coachId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('frame')}>
                    <div className={cx('title-and-back')}>
                        <div className={cx('back')}>
                            <Link
                                to={location.pathname.startsWith('/all-coaches') ? '/all-coaches' : '/'}
                                className={cx('back-link')}
                            >
                                <IoIosArrowBack />
                                <span>Quay lại</span>
                            </Link>
                        </div>
                        <h1 className={cx('title')}>Hồ sơ Huấn luyện viên</h1>
                    </div>
                    <div className={cx('main')}>
                        <div className={cx('profile')}>
                            <div className={cx('avatar')}>
                                {currentCoach?.avatarUrl ? (
                                    <img src={currentCoach.avatarUrl} className={cx('image')} alt={'coach'} />
                                ) : (
                                    <FaUserCircle className={cx('default')} />
                                )}
                            </div>
                            <h2 className={cx('name')}>{currentCoach.fullname}</h2>
                            <span className={cx(handleRenderGenderClassNames(currentCoach.gender))}>
                                {handleRenderGenders(currentCoach.gender)}
                            </span>
                            <span className={cx('age')}>{currentCoach.age} tuổi</span>
                        </div>
                        <div className={cx('tabs')}>
                            <Tabs tabs={tabs}></Tabs>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
};

export default CoachDetail;
