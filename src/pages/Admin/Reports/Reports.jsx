import classNames from 'classnames/bind';
import styles from './Reports.module.scss';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllReportsAsync } from '~/features/adminSlice';
import Modal from '~/components/Modal';

import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

const Reports = () => {
    const dispatch = useDispatch();
    const { reports } = useSelector((state) => state.admin);
    const [viewDetail, setViewDetail] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [file, setFile] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/admin/${currentUser.Id}/reports`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getAllReportsAsync({ pageIndex: currentPage, pageSize: 2 }));
    }, [dispatch, currentPage]);

    const handleViewDetail = (img) => {
        setFile(img);
        setViewDetail(true);
    };
    const handleClose = (e) => {
        setViewDetail(false);
        setFile(null);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <form className={cx('search')}>
                    <div className={cx('search-box')} type="submit">
                        <AiOutlineSearch className={cx('search-icon')} />
                        <input type="text" placeholder="Tìm kiếm" />
                    </div>
                </form>
                <div className={cx('list-reports')}>
                    {reports?.map((report) => (
                        <div className={cx('rp')}>
                            <label>{report.clientFullName}</label>
                            <div className={cx('photos')}>
                                {report.images?.map((photo) => (
                                    <img src={photo} alt="report" onClick={() => handleViewDetail(photo)} />
                                ))}
                            </div>
                            <p>{report.detail}</p>
                            <Link to={`${report.contractId}`}>
                                <button className={cx('btn-info')}>
                                    Xem chi tiết <MdOutlineKeyboardArrowRight className={cx('icon')} />
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
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
