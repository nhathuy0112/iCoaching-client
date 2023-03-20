import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllContractsAsync } from '~/features/coachSlice';
import { handleRenderGenders } from '~/utils/gender';
import styles from './Completed.module.scss';

const cx = classNames.bind(styles);

const Completed = () => {
    const dispatch = useDispatch();
    const { contracts } = useSelector((state) => state.coach);

    useEffect(() => {
        dispatch(getAllContractsAsync({ pageIndex: 1, pageSize: 12, status: 'Complete' }));
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
                                <Link to={`contract`} className={cx('card')}>
                                    <div className={cx('avatar')}>
                                        <img
                                            src={require('../../../../../assets/images/coach-avatar.png')}
                                            alt="Coach"
                                        />
                                    </div>
                                    <div className={cx('info')}>
                                        <div className={cx('fullname')}>
                                            <span>{contract.clientName}</span>
                                        </div>
                                        <div className={cx('gender')}>
                                            <span className={cx('')}>{handleRenderGenders(contract.clientGender)}</span>
                                        </div>
                                        <div className={cx('age')}>
                                            <span>{contract.clientAge} tuổi</span>
                                        </div>
                                    </div>
                                </Link>
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

export default Completed;
