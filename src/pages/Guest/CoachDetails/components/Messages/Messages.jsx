import classNames from 'classnames/bind';
import styles from './Messages.module.scss';

const cx = classNames.bind(styles);

const Messages = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('empty')}>
                    <h3 className={cx('message')}>Vui lòng đăng nhập để trò chuyện</h3>
                </div>
            </div>
        </div>
    );
};

export default Messages;
