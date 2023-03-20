import classNames from 'classnames/bind';
import Tabs from '~/components/Tabs';
import Active from './components/Active';
import Completed from './components/Completed';
import Canceled from './components/Canceled';
import styles from './MyClient.module.scss';

const cx = classNames.bind(styles);

const MyClient = () => {
    const tabs = [
        {
            label: 'Đang tập',
            content: <Active />,
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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
};

export default MyClient;
