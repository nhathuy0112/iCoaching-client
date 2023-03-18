import classNames from 'classnames/bind';
import styles from './Canceled.module.scss';

const cx = classNames.bind(styles);

const Canceled = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('request-list')}>
                <div className={cx('request-item')}>
                    <div className={cx('card')}>
                        <div className={cx('card-content')}>
                            <span className={cx('card-title', 'coach')}>Huấn luyện viên</span>
                            <span>Alicia</span>
                        </div>
                        <div className={cx('card-content')}>
                            <span className={cx('card-title', 'course-name')}>Gói tập</span>
                            <span>AAAA</span>
                        </div>
                        <div className={cx('card-content')}>
                            <span className={cx('card-title', 'duration')}>Số buổi</span>
                            <span>34</span>
                        </div>
                        <div className={cx('card-content')}>
                            <span className={cx('card-title', 'price')}>Giá</span>
                            <span>10.000.000 VNĐ</span>
                        </div>
                    </div>
                    <div className={cx('action')}>
                        <button id={cx('view-detail-btn')}>Xem lý do</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Canceled;
