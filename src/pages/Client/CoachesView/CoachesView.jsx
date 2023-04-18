import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachesView.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { getAllCoachesAsync } from '~/features/guestSlice';
import UserCard from '~/components/UserCard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
const cx = classNames.bind(styles);

const CoachesView = () => {
    const dispatch = useDispatch();
    const { coaches, totalCount } = useSelector((state) => state.guest);
    const [coachesDisplay, setCoachesDisplay] = useState(15);
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');
    const [isViewMoreSearch, setIsViewMoreSearch] = useState(false);

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
        dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay }))
            .unwrap()
            .then(() => {
                setIsViewMoreSearch(true);
            });
    }, [dispatch, coachesDisplay]);

    const handleShowMoreCoaches = () => {
        const newCoachesDisplay = totalCount - coachesDisplay;
        if (newCoachesDisplay >= 15) {
            setCoachesDisplay((prev) => prev + 15);
        } else {
            setCoachesDisplay((prev) => prev + newCoachesDisplay);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay }))
                .unwrap()
                .then(() => {
                    setIsViewMoreSearch(true);
                });
        } else {
            dispatch(getAllCoachesAsync({ pageIndex: 1, pageSize: coachesDisplay, search: searchValue }))
                .unwrap()
                .then((response) => {
                    if (response.count <= coachesDisplay) {
                        setIsViewMoreSearch(false);
                    } else {
                        setIsViewMoreSearch(true);
                    }
                });
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
                <form className={cx('search')} onSubmit={(e) => handleSearch(e)}>
                    <div className={cx('search-box')}>
                        <button type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                        </button>
                        <input
                            type="text"
                            placeholder="Huấn luyện viên"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                </form>
                {coaches && coaches.length > 0 ? (
                    <div className={cx('coach-list')}>
                        {coaches.map((coach) => (
                            <div className={cx('coach-item')} key={coach.id}>
                                <UserCard user={coach} role="coach" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cx('coach-empty')}>
                        <h2>Không tìm thấy Huấn luyện viên nào!</h2>
                    </div>
                )}
            </div>
            {coachesDisplay !== totalCount && isViewMoreSearch && (
                <button id={cx('view-all-btn')} onClick={handleShowMoreCoaches}>
                    Xem thêm
                </button>
            )}
        </div>
    );
};

export default CoachesView;
