import classNames from 'classnames/bind';
import Tabs from '~/components/Tabs';
import Canceled from './components/Canceled';
import CoachRejected from './components/CoachRejected';
import Pending from './components/Pending';
import styles from './CoachingRequest.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

const CoachingRequests = () => {
    const tabs = [
        {
            label: 'Chờ xác nhận',
            content: <Pending />,
        },
        {
            label: 'Đã hủy',
            content: <Canceled />,
        },
        {
            label: 'Bị từ chối',
            content: <CoachRejected />,
        },
    ];

    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/coaching-requests`);
            }
        }
    }, [id, currentUser, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default CoachingRequests;
