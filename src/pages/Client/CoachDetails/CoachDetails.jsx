import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachDetails.module.scss';

import Tabs from '~/components/Tabs/Tabs';
import AboutMe from './components/AboutMe';
import CoachPhoto from './components/CoachPhoto';
import TrainingCourse from './components/TrainingCourse';
import { handleRenderGenderClassNames, handleRenderGenders } from '~/utils/gender';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachProfileAsync } from '~/features/guestSlice';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import Home from '~/components/Chat/Home';
import { changeUser } from '~/features/chatSlice';

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
        {
            label: 'Trò chuyện',
            content: <Home />,
            onClick: () => handleSelect(),
        },
    ];
    const { id, coachId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentCoach, error } = useSelector((state) => state.guest);
    const { currentUser } = useSelector((state) => state.user);

    const handleSelect = () => {
        dispatch(changeUser({ currentUser: currentUser, payload: coachId }));
    };
    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                location.pathname.startsWith(`/client/${id}/all-coaches`)
                    ? navigate(`/client/${currentUser.Id}/all-coaches/view-details/coach/${coachId}`)
                    : navigate(`/client/${currentUser.Id}/view-details/coach/${coachId}`);
            }
        }
    }, [id, currentUser, navigate, location, coachId]);

    useEffect(() => {
        dispatch(getCoachProfileAsync(coachId));
    }, [dispatch, coachId]);

    return (
        <div className={cx('wrapper')}>
            {error ? (
                <div className={cx('no-available')}>
                    <h2>Huấn luyện viên này không tồn tại</h2>
                    <Link
                        to={
                            location.pathname.startsWith(`/client/${id}/all-coaches`)
                                ? `/client/${id}/all-coaches`
                                : '/'
                        }
                        className={cx('back-link')}
                    >
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
            ) : (
                <div className={cx('content')}>
                    <div className={cx('frame')}>
                        <div className={cx('title-and-back')}>
                            <div className={cx('back')}>
                                <Link
                                    to={
                                        location.pathname.startsWith(`/client/${id}/all-coaches`)
                                            ? `/client/${id}/all-coaches`
                                            : '/'
                                    }
                                    className={cx('back-link')}
                                >
                                    <IoIosArrowBack />
                                    <span>Quay lại</span>
                                </Link>
                            </div>
                            <h2 className={cx('title')}>Hồ sơ Huấn luyện viên</h2>
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
                                <h2 className={cx('name')}>{currentCoach?.fullname}</h2>
                                <span className={cx(handleRenderGenderClassNames(currentCoach?.gender))}>
                                    {handleRenderGenders(currentCoach?.gender)}
                                </span>
                                <span className={cx('age')}>{currentCoach?.age} tuổi</span>
                            </div>
                            <div className={cx('tabs')}>
                                <Tabs tabs={tabs}></Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoachDetail;
