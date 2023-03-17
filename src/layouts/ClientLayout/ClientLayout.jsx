import PropTypes from 'prop-types';
import HeaderClient from '../components/HeaderClient';
import Footer from '~/layouts/components/Footer/Footer';
import styles from './ClientLayout.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

const ClientLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <HeaderClient />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
};

ClientLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ClientLayout;
