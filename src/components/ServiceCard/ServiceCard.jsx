import styles from './ServiceCard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ServiceCard = ({ service }) => {
    const { icon, content, isMain } = service;
    return (
        <div className={isMain ? cx('service-item', 'main') : cx('service-item')}>
            <div className={cx('service-icon')}>{icon}</div>
            <span className={cx('service-content')}>{content}</span>
        </div>
    );
};

export default ServiceCard;
