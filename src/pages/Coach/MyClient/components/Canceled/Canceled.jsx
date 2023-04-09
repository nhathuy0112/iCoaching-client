import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllContractsAsync } from '~/features/coachSlice';
import { handleRenderGenders } from '~/utils/gender';
import Spinner from '~/components/Spinner';
import styles from './Canceled.module.scss';
import Pagination from '~/components/Pagination';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const Canceled = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { contracts, totalCount, pageSize, loading } = useSelector((state) => state.coach);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        dispatch(getAllContractsAsync({ pageIndex: currentPage, pageSize: 12, status: 'Canceled' }));
    }, [dispatch, currentPage]);

    const filteredContracts = contracts.filter((contract) =>
        contract.clientName.toLowerCase().includes(debounced.toLowerCase()),
    );

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {contracts && contracts.length > 0 ? (
                        <>
                            <form className={cx('search')}>
                                <div className={cx('search-box')} type="submit">
                                    <AiOutlineSearch className={cx('search-icon')} />
                                    <input
                                        type="text"
                                        placeholder="Khách hàng"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div className={cx('contract-list')}>
                                {filteredContracts.map((contract) => (
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
                                <Pagination
                                    className={cx('pagination-bar')}
                                    currentPage={currentPage}
                                    totalCount={totalCount}
                                    pageSize={pageSize}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </>
                    ) : (
                        <div className={cx('contract-empty')}>
                            <h2>Hiện chưa có khách hàng nào!</h2>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Canceled;
