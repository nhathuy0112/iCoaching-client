import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ReportDetails.module.scss';
import { updateReportAsync, updateContractStatusAsync } from '~/features/adminSlice';
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

    const { reportId } = useParams();
    const { currentUser } = useSelector((state) => state.user);

    const [resolveOpen, setResolveOpen] = useState(false);
    const [solution, setSolution] = useState('');

    const [rejectOpen, setRejectOpen] = useState(false);

    const [messageOpen, setMessageOpen] = useState(false);
    const [message, setMessage] = useState('');

    const [cancelOpen, setCancelOpen] = useState(false);

    //handle modal
    const handleOpen = (e) => {
        e(true);
    };
    const handleClose = (e) => {
        setResolveOpen(false);
        setRejectOpen(false);
        setMessageOpen(false);
    };
    const handleCloseCancel = (e) => {
        e.preventDefault();
        setCancelOpen(false);
        navigate(`/admin/${currentUser.id}/reports`);
    };

    //handle resolve report
    const handleResolveReport = (e) => {
        switch (solution) {
            case 'contract':
                return navigate('createContract');
            case 'voucher':
                return navigate('voucher');
            case 'message':
                handleClose();
                handleOpen(setMessageOpen);
                break;
            default:
                break;
        }
    };

    const handleUpdateReport = (option) => {
        dispatch(updateReportAsync({ reportId: reportId, option: option, message: message }));
        handleClose();
        if (option === 'Solve') {
            handleOpen(setCancelOpen);
            console.log(option);
        } else {
            navigate(`/admin/${currentUser.id}/reports`);
            console.log(option);
        }
    };

    //update contract status
    const handleCancelContract = (e) => {
        e.preventDefault();
        dispatch(updateContractStatusAsync({ reportId: reportId, option: 'Cancel', message: message }));
        navigate(`/admin/${currentUser.id}/reports`);
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

            {/* resolve modal */}
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

            {/* reject modal */}
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
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div className={cx('button')}>
                            <button
                                className={cx('btn-confirm')}
                                type="submit"
                                onClick={() => handleUpdateReport('Reject')}
                            >
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

            {/* send message modal */}
            {messageOpen && (
                <Modal
                    show={messageOpen}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        <h2 className={cx('title')}>Vui lòng nhập lời nhắn giải quyết khiếu nại</h2>
                        <textarea
                            name="cancel"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div className={cx('button')}>
                            <button
                                className={cx('btn-confirm')}
                                type="submit"
                                onClick={() => handleUpdateReport('Solve')}
                            >
                                <BsCheckLg className={cx('icon')} />
                                Đồng ý
                            </button>
                            <button className={cx('btn-warn')} onClick={handleClose}>
                                <BsXLg className={cx('icon')} /> Huỷ bỏ
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* cancel contract modal */}
            {cancelOpen && (
                <Modal
                    open={cancelOpen}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('header')}>iCoaching</h2>
                        <h2 className={cx('title')}>Bạn có muốn huỷ hợp đồng này? Hãy nhập lý do: </h2>
                        <textarea
                            name="cancel"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div className={cx('button')}>
                            <button className={cx('btn-confirm')} onClick={handleCancelContract} type="submit">
                                <BsCheckLg className={cx('icon')} />
                                Xác nhận
                            </button>
                            <button className={cx('btn-warn')} onClick={handleCloseCancel}>
                                <BsXLg className={cx('icon')} /> Từ chối
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ReportDetails;
