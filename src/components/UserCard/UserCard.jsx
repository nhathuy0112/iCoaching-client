import classNames from 'classnames/bind';
import styles from './UserCard.module.scss';

import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { handleRenderGenderClassNames, handleRenderGenders } from '~/utils/gender';

const cx = classNames.bind(styles);

const UserCard = ({ user, role }) => {
    const { id, fullname, gender, age, avatar } = user;
    return (
        <Link to={`view-details/${role}/${id}`} className={cx('card')}>
            <div className={cx('avatar')}>
                {avatar ? (
                    <img src={require('~/assets/images/coach-photo1.png')} alt="Coach" />
                ) : (
                    <div className={cx('default')}>
                        <FaUserCircle className={cx('icon')} />
                    </div>
                )}
            </div>
            <div className={cx('info')}>
                <div className={cx('fullname')}>
                    <span>{fullname}</span>
                </div>
                <div className={cx('gender')}>
                    <span className={cx(handleRenderGenderClassNames(gender))}>{handleRenderGenders(gender)}</span>
                </div>
                <div className={cx('age')}>
                    <span>{age} tuổi</span>
                </div>
            </div>
        </Link>
    );
};

export default UserCard;
