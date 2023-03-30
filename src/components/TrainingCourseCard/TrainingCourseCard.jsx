import classNames from 'classnames/bind';
import styles from './TrainingCourseCard.module.scss';

const cx = classNames.bind(styles);

const TrainingCourseCard = ({ course }) => {
    const { name, price } = course;
    return (
        <div className={cx('card')}>
            <h3 className={cx('name')}>{name}</h3>
            <span className={cx('price')}>{price}</span>
        </div>
    );
};

export default TrainingCourseCard;
