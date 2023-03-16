import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReportDetails.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import Modal from '~/components/Modal';

import rp1 from '~/assets/images/report1.png';
import rp2 from '~/assets/images/report2.png';

const cx = classNames.bind(styles);

const ReportDetails = ({ id }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [viewDetail, setViewDetail] = useState(false);
    const [file, setFile] = useState('');

    const [resolveLog, setResolveLog] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const handleOpen = (e, img) => {
        e(true);
        setFile(img);
    };
    const handleClose = (e) => {
        setViewDetail(false);
        setResolveLog(false);
        setConfirm(false);
    };
    const images = [
        {
            id: 1,
            url: rp1,
        },
        {
            id: 2,
            url: rp2,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/admin/${currentUser?.Id}/reports`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </Link>
                <h2>Hợp đồng huấn luyện</h2>
            </div>
            <div className={cx('content')}>
                <div className={cx('contract-info')}>
                    <div className={cx('f-col')}>
                        <label>Khách hàng</label>
                        <span>Hoang Trần</span>
                        <label>Huấn luyện viên</label>
                        <span>Huy Trần</span>
                        <label>Gói tập</label>
                        <span>Gói luxury premium</span>
                    </div>
                    <div className={cx('col')} id={cx('sm')}>
                        <label>Giới tính</label>
                        <span>Nam</span>
                        <label>Giới tính</label>
                        <span>Nữ</span>
                        <label>Số buổi tập</label>
                        <span>60</span>
                    </div>
                    <div className={cx('col')}>
                        <label>Email</label>
                        <span>client@gmail.com</span>
                        <label>Email</label>
                        <span>coach@gmail.com</span>
                        <label>Trạng thái</label>
                        <span>Đang tập</span>
                    </div>
                    <div className={cx('col')}>
                        <label>SĐT</label>
                        <span>0918171615</span>
                        <label>SĐT</label>
                        <span>0987654321</span>
                        <label>Giá</label>
                        <span>30.000.000VNĐ</span>
                    </div>
                </div>
                <div className={cx('description')}>
                    <label>Mô tả gói tập</label>
                    <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop public...
                    </p>
                </div>
                <div className={cx('description')}>
                    <label>Mô tả vấn đề</label>
                    <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                        printer took a galley of type and scrambled it to make a type specimen book. It has survived not
                        only five centuries, but also the leap into electronic typesetting, remaining essentially
                        unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem
                        Ipsum passages, and more recently with desktop public...
                    </p>
                    <div className={cx('img-wrapper')}>
                        {images.map((item) => (
                            <img
                                key={item.id}
                                src={item.url}
                                alt=""
                                onClick={() => handleOpen(setViewDetail, item.url)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('btn-wrapper')}>
                <div className={cx('button')}>
                    <button className={cx('btn-confirm')} onClick={() => handleOpen(setResolveLog)}>
                        <BsCheckLg className={cx('icon')} />
                        Đã giải quyết
                    </button>
                    <button className={cx('btn-warn')} onClick={() => handleOpen(setConfirm)}>
                        <BsXLg className={cx('icon')} />
                        Từ chối
                    </button>
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
