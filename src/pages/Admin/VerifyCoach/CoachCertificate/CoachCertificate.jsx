import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachCertificate.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getCertRequestDetailAsync, updateCertStatusAsync } from '~/features/adminSlice';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { handleRenderGenders, handleRenderGenderClassNames } from '~/utils/gender';
import Modal from '~/components/Modal';
import Spinner from '~/layouts/components/Spinner';

const cx = classNames.bind(styles);

const CoachCertificate = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { certRequest, status, loading } = useSelector((state) => state.admin);

    const [viewDetail, setViewDetail] = useState(false);
    const [denied, setDenied] = useState(false);
    const [file, setFile] = useState('');
    const [reason, setReason] = useState(null);

    const dispatch = useDispatch();
    const id = useParams().certId;

    useEffect(() => {
        dispatch(getCertRequestDetailAsync(id));
    }, [dispatch, id, status]);

    const handleOpenModal = (modal, img) => {
        modal(true);
        setFile(img);
    };
    const handleClose = () => {
        setViewDetail(false);
        setDenied(false);
    };

    const handleUpdateStatus = (option, reason) => {
        dispatch(updateCertStatusAsync({ certId: id, option: option, reason }))
            .unwrap()
            .then(() => handleClose());
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/admin/${currentUser?.Id}/verify-coach`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </Link>
                <h3>
                    Yêu cầu từ Huấn luyện viên <span>{`${certRequest.fullname}`}</span>
                </h3>
            </div>
            <div className={cx('content')}>
                <div className={cx('profile')}>
                    <div className={cx('avatar')}>
                        <img src={certRequest.avatarUrl} alt={'avatar'} className={cx('image')} />
                    </div>
                    <h2 className={cx('name')}>{certRequest.fullname}</h2>
                    <div className={cx('gender')}>
                        <span className={cx(handleRenderGenderClassNames(certRequest.gender))}>
                            {handleRenderGenders(certRequest.gender)}
                        </span>
                    </div>
                    <span className={cx('age')}>{certRequest.age} tuổi</span>
                </div>

                <div className={cx('certificates')}>
                    <h3>Danh sách chứng chỉ</h3>
                    <div className={cx('img-wrapper')}>
                        {certRequest.certPhotos?.map((item) => (
                            <img src={item} alt="cert-photos" onClick={() => handleOpenModal(setViewDetail, item)} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('status')}>
                {(() => {
                    switch (certRequest.status) {
                        case 'Pending':
                            return (
                                <div className={cx('btn-wrapper')}>
                                    <div className={cx('button')}>
                                        <button
                                            className={cx('btn-confirm')}
                                            onClick={() => handleUpdateStatus('Accepted', '')}
                                        >
                                            <BsCheckLg className={cx('icon')} />
                                            Xác nhận
                                        </button>
                                        <button className={cx('btn-warn')} onClick={() => handleOpenModal(setDenied)}>
                                            <BsXLg className={cx('icon')} />
                                            Từ chối
                                        </button>
                                    </div>
                                </div>
                            );
                        case 'Denied':
                            return <p className={cx('denied')}>Đã từ chối</p>;
                        default:
                            return <p className={cx('accepted')}>Đã xác nhận</p>;
                    }
                })()}
            </div>

            {viewDetail && (
                <Modal
                    show={viewDetail}
                    onClose={handleClose}
                    modalStyle={{ background: 'none' }}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <button className={cx('closeBtn')} onClick={() => setViewDetail(false)}>
                        <AiOutlineClose />
                    </button>
                    <img id={cx('photo')} src={file} alt="" />
                </Modal>
            )}
            {denied && (
                <Modal
                    open={denied}
                    onClose={handleClose}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '60%' }}
                >
                    <div className={cx('modal')}>
                        <h2 className={cx('modal-header')}>iCoaching</h2>
                        <form onSubmit={() => handleUpdateStatus('Denied', reason)}>
                            <p>{'Vui lòng nhập lý do từ chối'}</p>
                            <textarea
                                name=""
                                id=""
                                cols="90"
                                rows="10"
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            ></textarea>
                            <div className={cx('button')}>
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <button className={cx('btn-confirm')} type="submit">
                                            <BsCheckLg className={cx('icon')} />
                                            Xác nhận
                                        </button>
                                        <button className={cx('btn-warn')} onClick={handleClose}>
                                            <BsXLg className={cx('icon')} /> Huỷ bỏ
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default CoachCertificate;
