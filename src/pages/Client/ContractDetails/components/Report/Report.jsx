import classNames from 'classnames/bind';
import styles from './Report.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getContractReportsAsync } from '~/features/contractSlice';
import Modal from '~/components/Modal';

import { AiOutlineClose } from 'react-icons/ai';
import Spinner from '~/components/Spinner';
import { BiChevronRight } from 'react-icons/bi';
const cx = classNames.bind(styles);

const Report = () => {
    const dispatch = useDispatch();
    const { reports, loading } = useSelector((state) => state.contract);
    const { contractId } = useParams();
    const [viewDetail, setViewDetail] = useState(false);
    const [file, setFile] = useState('');

    useEffect(() => {
        dispatch(getContractReportsAsync(contractId));
    }, [dispatch, contractId]);

    const handleViewDetail = (img) => {
        setFile(img);
        setViewDetail(true);
    };
    const handleClose = (e) => {
        setViewDetail(false);
        setFile(null);
    };

    const handleReportStatus = (report) => {
        switch (report.reportStatus) {
            case 'Pending':
                return (
                    <>
                        <h3 className={cx('pending')}>Đang chờ giải quyết</h3>
                        <span className={cx('date')}>Đã gửi lúc {report.createdDate}</span>
                    </>
                );
            case 'Solved':
                return (
                    <>
                        <h3 className={cx('solved')}>Đã giải quyết</h3>
                        <p className={cx('note')}>{report.solutionDesc}</p>
                        <span className={cx('date')}>Đã gửi lúc {report.createdDate}</span>
                    </>
                );
            case 'Rejected':
                return (
                    <>
                        <h3 className={cx('rejected')}>Đã từ chối</h3>
                        <p className={cx('note')}>Lý do: {report.rejectReason}</p>
                        <span className={cx('date')}>Đã gửi lúc {report.createdDate}</span>
                    </>
                );
            default:
                break;
        }
    };
    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('content')}>
                    {reports?.length !== 0 ? (
                        <>
                            <div className={cx('list-reports')}>
                                {reports?.map((report) => (
                                    <div className={cx('rp')} key={report.id}>
                                        <div className={cx('status')}>{handleReportStatus(report)}</div>
                                        <hr />
                                        <div className={cx('photos')}>
                                            {report.images?.map((photo) => (
                                                <img
                                                    key={photo}
                                                    src={photo}
                                                    alt="report"
                                                    onClick={() => handleViewDetail(photo)}
                                                />
                                            ))}
                                        </div>
                                        <p className={cx('detail')}>{report.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={cx('message')}>
                            <h3>Không tìm thấy khiếu nại nào!</h3>
                        </div>
                    )}
                </div>
            )}
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

export default Report;
