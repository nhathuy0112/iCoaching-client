import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/components/Modal';
import { getCoachingRequestsAsync } from '~/features/coachSlice';
import { handleRenderGenders } from '~/utils/gender';
import Pagination from '~/components/Pagination';
import styles from './CoachRejected.module.scss';
import Spinner from '~/components/Spinner';
import { BsFillEnvelopeFill } from 'react-icons/bs';

const cx = classNames.bind(styles);

const CoachRejected = () => {
    const dispatch = useDispatch();
    const { coachingRequests, totalCount, pageSize, loading } = useSelector((state) => state.coach);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [isViewDetails, setIsViewDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        dispatch(
            getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 7, coachRequestStatus: 'CoachRejected' }),
        );
    }, [dispatch, currentPage]);

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setIsViewDetails(true);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(
                getCoachingRequestsAsync({ pageIndex: currentPage, pageSize: 7, coachRequestStatus: 'CoachRejected' }),
            );
        } else {
            dispatch(
                getCoachingRequestsAsync({
                    pageIndex: currentPage,
                    pageSize: 7,
                    coachRequestStatus: 'CoachRejected',
                    search: searchValue,
                }),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <form className={cx('search')} onSubmit={(e) => handleSearch(e)}>
                        <div className={cx('search-box')}>
                            <button type="submit">
                                <AiOutlineSearch className={cx('search-icon')} />
                            </button>
                            <input
                                type="text"
                                placeholder="Khách hàng"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </form>
                    {coachingRequests && coachingRequests.length > 0 ? (
                        <>
                            <table id={cx('request-table')}>
                                <thead>
                                    <tr className={cx('header-row')}>
                                        <th>Khách hàng</th>
                                        <th>Tuổi</th>
                                        <th>Giới tính</th>
                                        <th>Email</th>
                                        <th>SĐT</th>
                                        <th>Gói tập</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coachingRequests.map((request) => (
                                        <tr className={cx('content-row')} key={request.id}>
                                            <td className={cx('name')}>
                                                {/* <div className={cx('avatar')}>
                                                    <img
                                                        src={require('../../../../../assets/images/coach-avatar.png')}
                                                        alt=""
                                                    />
                                                </div> */}
                                                <span>{request.clientName}</span>
                                            </td>
                                            <td>{request.age}</td>
                                            <td>{handleRenderGenders(request.gender)}</td>
                                            <td>{request.email}</td>
                                            <td>{request.phoneNumber}</td>
                                            <td>{request.courseName}</td>
                                            <td className={cx('action-btn')}>
                                                <button
                                                    id={cx('btn-view-detail')}
                                                    onClick={() => handleViewDetails(request)}
                                                >
                                                    <BsFillEnvelopeFill />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div className={cx('request-empty')}>
                            <h2>Không tìm thấy yêu cầu nào!</h2>
                        </div>
                    )}

                    <Pagination
                        className={cx('pagination-bar')}
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            )}
            {isViewDetails && (
                <Modal
                    id={cx('view-detail-modal')}
                    show={isViewDetails}
                    onClose={() => setIsViewDetails(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ color: 'var(--white-color)', cursor: 'pointer' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Lý do từ chối gói tập !</h2>
                        <textarea className={cx('reason')} defaultValue={selectedRequest.rejectReason} readOnly />
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CoachRejected;
