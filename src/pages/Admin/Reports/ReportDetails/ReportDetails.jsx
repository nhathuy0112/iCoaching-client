import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ReportDetails.module.scss';

import Modal from '~/components/Modal';
import Tabs from '~/components/Tabs';
import ContractDetails from './components/ContractDetails';
import Progress from './components/Progress';
import { IoIosArrowBack } from 'react-icons/io';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
const cx = classNames.bind(styles);

const ReportDetails = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [resolveLog, setResolveLog] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleOpen = (e) => {
        e(true);
    };
    const handleClose = (e) => {
        setResolveLog(false);
        setConfirm(false);
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
                        <button className={cx('btn-confirm')} onClick={() => handleOpen(setResolveLog)}>
                            <BsCheckLg className={cx('icon')} />
                            Giải quyết
                        </button>
                        <button className={cx('btn-warn')} onClick={() => handleOpen(setConfirm)}>
                            <BsXLg className={cx('icon')} />
                            Từ chối
                        </button>
                    </div>
                </div>
            </div>
            {resolveLog && (
                <Modal
                    open={resolveLog}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('modal-header')}>iCoaching</h2>
                        <form action="">
                            <p>{'Vui lòng nhập quy trình giải quyết khiếu nại cho khách hàng'}</p>
                            <textarea name="" id="" cols="90" rows="10" required></textarea>
                            <div className={cx('button')}>
                                <button className={cx('btn-confirm')} onClick={''} type="submit">
                                    <BsCheckLg className={cx('icon')} />
                                    Xác nhận
                                </button>
                                <button className={cx('btn-warn')} onClick={handleClose}>
                                    <BsXLg className={cx('icon')} /> Huỷ bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
            {confirm && (
                <Modal
                    show={confirm}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('modal-header')}>iCoaching</h2>
                        <form action="">
                            <p>{'Từ chối giải quyết khiếu nại này?'}</p>
                            <div className={cx('button')}>
                                <button className={cx('btn-confirm')} type="submit">
                                    <BsCheckLg className={cx('icon')} />
                                    Đồng ý
                                </button>
                                <button className={cx('btn-warn')} onClick={handleClose}>
                                    <BsXLg className={cx('icon')} /> Huỷ bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ReportDetails;
