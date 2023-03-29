import classNames from 'classnames/bind';
import Tabs from '~/components/Tabs';
import Active from './components/Active';
import Completed from './components/Completed';
import Canceled from './components/Canceled';
import styles from './MyClient.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Pending from './components/Pending';

const cx = classNames.bind(styles);

const MyClient = () => {
    const tabs = [
        {
            label: 'Đang tập',
            content: <Active />,
        },
        {
            label: 'Đợi hoàn thành',
            content: <Pending />,
        },
        {
            label: 'Đã hoàn thành',
            content: <Completed />,
        },
        {
            label: 'Đã hủy',
            content: <Canceled />,
        },
    ];

    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/coach/${currentUser.Id}/my-clients`);
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

export default MyClient;
