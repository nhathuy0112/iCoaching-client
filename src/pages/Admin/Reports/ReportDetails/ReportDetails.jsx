import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ReportDetails.module.scss';
import { updateReportAsync } from '~/features/adminSlice';
import Modal from '~/components/Modal';
import Tabs from '~/components/Tabs';
import ContractDetails from './components/ContractDetails';
import Progress from './components/Progress';
import { IoIosArrowBack } from 'react-icons/io';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
const cx = classNames.bind(styles);

const ReportDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const { reportId } = useSelector((state) => state.admin);
    const { currentUser } = useSelector((state) => state.user);

    const [resolveOpen, setResolveOpen] = useState(false);
    const [solution, setSolution] = useState('');
    const [rejectOpen, setRejectOpen] = useState(false);
    const [reason, setReason] = useState('');

    const handleOpen = (e) => {
        e(true);
    };
    const handleClose = (e) => {
        setResolveOpen(false);
        setRejectOpen(false);
    };

    const handleResolveReport = (e) => {
        switch (solution) {
            case 'contract':
                return navigate('createContract');
            case 'voucher':
                return navigate('voucher');
            case 'message':
                break;
            default:
                break;
        }
    };

    const handleDenyReport = () => {
        // dispatch(updateReportAsync({ reportId: reportId, option: 'Reject', reason: reason }));
    };
    const tabs = [
        {
            label: 'Hợp đồng huấn luyện',
            content: <ContractDetails />,
        },
        {
            label: 'Tiến độ',
            content: <Progress />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <Link to={`/admin/${currentUser?.Id}/reports`} className={cx('back-link')}>
                        <IoIosArrowBack />
                        <span>Quay lại</span>
                    </Link>
                </div>
                <div className={cx('tabs')}>
                    <Tabs tabs={tabs}></Tabs>
                </div>
                <div className={cx('btn-wrapper')}>
                    <div className={cx('button')}>
                        <button className={cx('btn-confirm')} onClick={() => handleOpen(setResolveOpen)}>
                            <BsCheckLg className={cx('icon')} />
                            Giải quyết
                        </button>
                        <button className={cx('btn-warn')} onClick={() => handleOpen(setRejectOpen)}>
                            <BsXLg className={cx('icon')} />
                            Từ chối
                        </button>
                    </div>
                </div>
            </div>
            {resolveOpen && (
                <Modal
                    open={resolveOpen}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        <h2 className={cx('title')}>Vui lòng chọn phương thức giải quyết:</h2>
                        <select name="solution" defaultValue="" onChange={(e) => setSolution(e.target.value)}>
                            <option value="" disabled></option>
                            <option value="contract">Tạo hợp đồng mới</option>
                            <option value="voucher">Tặng voucher</option>
                            <option value="message">Gửi lời nhắn</option>
                        </select>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} onClick={handleResolveReport} type="submit">
                                <BsCheckLg className={cx('icon')} />
                                Xác nhận
                            </button>
                            <button className={cx('btn-warn')} onClick={handleClose}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
            {rejectOpen && (
                <Modal
                    show={rejectOpen}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        {/* <form action={handleDenyReport()}> */}
                        <h2 className={cx('title')}>{'Vui lòng nhập lý do từ chối'}</h2>
                        <textarea
                            name="cancel"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => setReason(e.target.value)}
                        ></textarea>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} type="submit">
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('btn-warn')} onClick={handleClose}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                        {/* </form> */}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ReportDetails;
