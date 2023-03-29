import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import Tabs from '~/components/Tabs';
import Information from './components/Information';
import Program from './components/Program';
import Progress from './components/Progress';
import Report from './components/Report';
import styles from './PendingCourseDetails.module.scss';

const cx = classNames.bind(styles);

const PendingCourseDetails = () => {
    const { id } = useParams();

    const tabs = [
        {
            label: 'Thông tin',
            content: <Information />,
        },
        {
            label: 'Chương trình tập luyện',
            content: <Program />,
        },
        {
            label: 'Tiến độ',
            content: <Progress />,
        },
        {
            label: 'Khiếu nại',
            content: <Report />,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('frame')}>
                    <div className={cx('title-and-back')}>
                        <div className={cx('back')}>
                            <Link to={`/client/${id}/pending-courses`} className={cx('back-link')}>
                                <IoIosArrowBack />
                                <span>Quay lại</span>
                            </Link>
                        </div>
                        <h2 className={cx('title')}>Chi tiết hợp đồng</h2>
                    </div>
                    <div className={cx('main')}>
                        <Tabs tabs={tabs} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingCourseDetails;
