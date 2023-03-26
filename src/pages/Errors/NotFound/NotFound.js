import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

const NotFound = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const handleBackHome = (currentUser) => {
        if (currentUser) {
            switch (currentUser.role) {
                case 'CLIENT':
                    navigate(`/client/${currentUser.Id}`);
                    break;
                case 'COACH':
                    navigate(`/coach/${currentUser.Id}/verify`);
                    break;
                case 'ADMIN':
                    navigate(`/admin/${currentUser.Id}/all-coaches`);
                    break;
                case 'SUPER_ADMIN':
                    navigate(`/super_admin/${currentUser.Id}/list-admin`);
                    break;
                default:
                    navigate('/');
            }
        } else {
            navigate('/');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('error')}>404</h1>
            <div className={cx('page')}>Trang bạn vừa truy cập không tồn tại!</div>
            <button id={cx('back-home')} onClick={() => handleBackHome(currentUser)}>
                Về trang chủ
            </button>
        </div>
    );
};

export default NotFound;
