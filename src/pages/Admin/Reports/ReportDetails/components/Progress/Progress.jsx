import classNames from 'classnames/bind';
import styles from './Progress.module.scss';

const cx = classNames.bind(styles);

const Progress = () => {
    return (
        <div className="wrapper">
            <div className={cx('content')}>
                <div className={cx('training-log')}>
                    <label>Buổi 1</label>
                </div>{' '}
                <div className={cx('training-log')}>
                    <label>Buổi 2</label>
                </div>
            </div>
        </div>
    );
};

export default Progress;
