import classNames from 'classnames/bind';
import styles from './ErrorMessage.module.scss';

import { AiOutlineWarning } from 'react-icons/ai';

const cx = classNames.bind(styles);

const ErrorMessage = ({ message }) => {
    return (
        <div className={cx('wrapper')}>
            <AiOutlineWarning />
            <p className={cx('message')}>{message}!</p>
        </div>
    );
};

export default ErrorMessage;
