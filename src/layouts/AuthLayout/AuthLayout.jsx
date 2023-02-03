import PropTypes from 'prop-types';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';

const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthLayout;
