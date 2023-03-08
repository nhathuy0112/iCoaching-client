import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachesView.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCoachesAsync } from '~/features/guestSlice';
import UserCard from '~/components/UserCard';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
const cx = classNames.bind(styles);

const CoachesView = () => {
    const dispatch = useDispatch();
    const { coaches, totalCount } = useSelector((state) => state.guest);
    const [coachesDisplay, setCoachesDisplay] = useState(15);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


    useEffect(() => {
        dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay }));
    }, [dispatch, coachesDisplay]);

    const handleShowMoreCoaches = () => {
        const newCoachesDisplay = totalCount - coachesDisplay;
        if (newCoachesDisplay >= 15) {
            setCoachesDisplay(
                (prev) => prev + 15,
                () => {
                    dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay }));
                },
            );
        } else {
            setCoachesDisplay(
                (prev) => prev + newCoachesDisplay,
                () => {
                    dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay }));
                },
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <div className={cx('back')}>
                        <Link to={`/`} className={cx('back-link')}>
                            <IoIosArrowBack />
                            <span>Quay lại</span>
                        </Link>
                    </div>
                    <div className={cx('title')}>
                        <h1>Huấn luyện viên</h1>
                        <span>Đội ngũ huấn luyện viên chất lượng, tận tình sẵn sàng phục vụ mọi người</span>
                    </div>
                </div>
                <div className={cx('coach-list')}>
                    {coaches.map((coach) => (
                        <div className={cx('coach-item')} key={coach.id}>
                            <UserCard user={coach} role="coach" />
                        </div>
                    ))}
                </div>
            </div>
            {coachesDisplay !== totalCount && (
                <button id={cx('view-all-btn')} onClick={handleShowMoreCoaches}>
                    Xem thêm
                </button>
            )}
        </div>
    );
};

export default CoachesView;
