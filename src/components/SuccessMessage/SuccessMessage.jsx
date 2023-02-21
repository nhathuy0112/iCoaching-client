import classNames from 'classnames/bind';
import styles from './SuccessMessage.module.scss';

import { HiCheckCircle } from 'react-icons/hi';

const cx = classNames.bind(styles);

const SuccessMessage = ({ message }) => {
    return (
        <div className={cx('wrapper')}>
            <HiCheckCircle />
            <p className={cx('message')}>{message}!</p>
        </div>
    );
};

export default SuccessMessage;
