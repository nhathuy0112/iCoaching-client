import styles from './TrainingCourse.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const TrainingCourse = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('course')}>
                    <label>Gói 12 tuần</label>
                    <Link to={''}>Đăng ký ngay</Link>
                </div>
                <div className={cx('course')}>
                    <label>Gói 12 tuần</label>
                    <Link to={''}>Đăng ký ngay</Link>
                </div>
                <div className={cx('course')}>
                    <label>Gói 12 tuần</label>
                    <Link to={''}>Đăng ký ngay</Link>
                </div>
                <div className={cx('course')}>
                    <label>Gói 12 tuần</label>
                    <Link to={''}>Đăng ký ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default TrainingCourse;
