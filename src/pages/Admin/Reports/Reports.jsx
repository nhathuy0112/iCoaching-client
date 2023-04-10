import classNames from 'classnames/bind';
import styles from './Reports.module.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllReportsAsync } from '~/features/adminSlice';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

import { AiOutlineClose } from 'react-icons/ai';
import useDebounce from '~/hooks/useDebounce';
const cx = classNames.bind(styles);

const Reports = () => {
    const dispatch = useDispatch();
    const { reports, totalCount, pageSize } = useSelector((state) => state.admin);
    const [viewDetail, setViewDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [file, setFile] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/admin/${currentUser.Id}/reports`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getAllReportsAsync({ pageIndex: currentPage, pageSize: 3 }));
    }, [dispatch, currentPage]);

    const handleViewDetail = (img) => {
        setFile(img);
        setViewDetail(true);
    };
    const handleClose = (e) => {
        setViewDetail(false);
        setFile(null);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchValue) {
            dispatch(getAllReportsAsync({ pageIndex: currentPage, pageSize: 3 }));
        } else {
            dispatch(getAllReportsAsync({ pageIndex: currentPage, pageSize: 3, searchValue }));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
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
                {reports && reports.length > 0 ? (
                    <>
                        <div className={cx('list-reports')}>
                            {reports?.map((report) => (
                                <div className={cx('rp')} key={report.id}>
                                    <label>{report.clientFullName}</label>
                                    <div className={cx('photos')}>
                                        {report.images?.map((photo) => (
                                            <img
                                                key={photo.id}
                                                src={photo}
                                                alt="report"
                                                onClick={() => handleViewDetail(photo)}
                                            />
                                        ))}
                                    </div>
                                    <p>{report.detail}</p>
                                    <Link to={`${report.contractId}/view-details/${report.id}`}>
                                        <button className={cx('btn-info')}>
                                            Xem chi tiết <MdOutlineKeyboardArrowRight className={cx('icon')} />
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className={cx('message')}>
                        <h2>Không tìm thấy khiếu nại nào!</h2>
                    </div>
                )}
            </div>
            <Pagination
                className={cx('pagination-bar')}
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
            {viewDetail && (
                <Modal
                    open={viewDetail}
                    onClose={handleClose}
                    modalStyle={{ background: 'none' }}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <button className={cx('closeBtn')} onClick={handleClose}>
                        <AiOutlineClose />
                    </button>
                    <img id={cx('photo')} src={file} alt="" />
                </Modal>
            )}
        </div>
    );
};

export default Reports;
