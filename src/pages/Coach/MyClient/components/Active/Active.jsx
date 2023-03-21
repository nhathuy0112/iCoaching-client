import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllContractsAsync } from '~/features/coachSlice';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Active.module.scss';

const cx = classNames.bind(styles);

const Active = () => {
    const dispatch = useDispatch();
    const { contracts } = useSelector((state) => state.coach);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllContractsAsync({ pageIndex: 1, pageSize: 12, status: 'Active' }));
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            {contracts && contracts.length > 0 ? (
                <>
                    <form className={cx('search')}>
                        <div className={cx('search-box')} type="submit">
                            <AiOutlineSearch className={cx('search-icon')} />
                            <input type="text" placeholder="Tìm kiếm" />
                        </div>
                    </form>
                    <div className={cx('contract-list')}>
                        {contracts.map((contract) => (
                            <div className={cx('contract-item')} key={contract.id}>
                                <div className={cx('card')}>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'course-name')}>Gói tập</span>
                                        <span>{contract.courseName}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'client')}>Khách hàng</span>
                                        <span>{contract.clientName}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'age')}>Tuổi</span>
                                        <span>{contract.clientAge}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'gender')}>Giới tính</span>
                                        <span>{handleRenderGenders(contract.clientGender)}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'email')}>Email</span>
                                        <span>{contract.clientEmail}</span>
                                    </div>
                                    <div className={cx('card-content')}>
                                        <span className={cx('card-title', 'phone')}>Số điện thoại</span>
                                        <span>{contract.clientPhoneNumber}</span>
                                    </div>
                                </div>
                                <div className={cx('action')}>
                                    <Link
                                        to={`/coach/${id}/my-clients/view-details/${contract.id}`}
                                        id={cx('view-detail-link')}
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={cx('contract-empty')}>
                    <h2>Hiện chưa có khách hàng nào!</h2>
                </div>
            )}
        </div>
    );
};

export default Active;
