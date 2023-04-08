import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachesView.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCoachesAsync } from '~/features/guestSlice';
import UserCard from '~/components/UserCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from '~/hooks/useDebounce';
const cx = classNames.bind(styles);

const CoachesView = () => {
    const dispatch = useDispatch();
    const { coaches, totalCount } = useSelector((state) => state.guest);
    const [coachesDisplay, setCoachesDisplay] = useState(15);
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/client/${currentUser.Id}/all-coaches`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay }));
    }, [dispatch, coachesDisplay]);

    const filteredCoaches = coaches.filter((coach) => coach.fullname.toLowerCase().includes(debounced.toLowerCase()));

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
                <form className={cx('search')}>
                    <div className={cx('search-box')} type="submit">
                        <AiOutlineSearch className={cx('search-icon')} />
                        <input
                            type="text"
                            placeholder="Huấn luyện viên"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </form>
                <div className={cx('coach-list')}>
                    {filteredCoaches.map((coach) => (
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
