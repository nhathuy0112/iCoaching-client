import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import Tabs from '~/components/Tabs';
import Canceled from './components/Canceled';
import CoachRejected from './components/CoachRejected';
import Init from './components/Init';
import Pending from './components/Pending';
import styles from './TrainingRequest.module.scss';

const cx = classNames.bind(styles);

const TrainingRequest = () => {
    const { id } = useParams();

    const tabs = [
        {
            label: 'Chưa thanh toán',
            content: <Init />,
        },
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

export default TrainingRequest;
