import classNames from 'classnames/bind';
import Tabs from '~/components/Tabs';
import Canceled from './components/Canceled';
import CoachRejected from './components/CoachRejected';
import Pending from './components/Pending';
import styles from './CoachingRequest.module.scss';

const cx = classNames.bind(styles);

const RequestCoaching = () => {
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default RequestCoaching;
