import styles from './CoachCard.module.scss';
import classNames from 'classnames/bind';
import { FaUserCircle } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const CoachCard = ({ id }) => {
    return (
        <div className={cx('coach-item')}>
            <div className={cx('status')}>
                <div className={cx('icon')}></div>
                <span className={cx('status-title')}>Trực tuyến</span>
            </div>
            <div className={cx('avatar')}>
                <FaUserCircle className={cx('icon')} />
            </div>
            <h3 className={cx('name')}>Huy Tran Nhat</h3>
            <span className={cx('experience')}>5 năm kinh nghiệm</span>
            <Link to={`/coaches/${id}`} id={cx('view-btn')}>
                Xem thông tin
            </Link>
        </div>
    );
};

export default CoachCard;
