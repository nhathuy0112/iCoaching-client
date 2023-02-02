import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer/Footer';
import styles from './GuestLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const GuestLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

GuestLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GuestLayout;
