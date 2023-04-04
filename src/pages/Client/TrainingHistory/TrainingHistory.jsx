import classNames from 'classnames/bind';
import styles from './TrainingHistory.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Completed from './components/Completed';
import Canceled from './components/Canceled';
import Tabs from '~/components/Tabs';

const cx = classNames.bind(styles);

const TrainingHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/client/${currentUser.Id}/training-history`);
            }
        }
    }, [id, currentUser, navigate]);

    const tabs = [
        {
            label: 'Đã hoàn thành',
            content: <Completed />,
        },
        {
            label: 'Đã hủy',
            content: <Canceled />,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/client/${id}`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Trang chủ</span>
                </Link>
                <h2 className={cx('header')}>Yêu cầu tập luyện</h2>
            </div>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default TrainingHistory;
