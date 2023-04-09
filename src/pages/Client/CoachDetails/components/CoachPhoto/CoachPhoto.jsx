import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CoachPhoto.module.scss';
import classNames from 'classnames/bind';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

import { AiOutlineClose } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';
import { getCoachPhotosAsync } from '~/features/guestSlice';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const CoachPhoto = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    const { coachId } = useParams();
    const dispatch = useDispatch();
    const { photos, totalCount, pageSize, loading } = useSelector((state) => state.guest);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getCoachPhotosAsync({ coachId: coachId, pageIndex: currentPage, pageSize: 8 }));
    }, [dispatch, currentPage, coachId]);

    const handleOpen = (e) => {
        setOpen(true);
        setFile(e);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className={cx('content')}>
                        {photos.length !== 0 ? (
                            <div className={cx('image-list')}>
                                {photos.map((item, index) => (
                                    <div className={cx('item')} key={index}>
                                        <img onClick={() => handleOpen(item.url)} src={item.url} alt="porfolio" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={cx('empty')}>
                                <h3 className={cx('message')}>Huấn luyện viên này chưa cập nhật ảnh</h3>
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
                </>
            )}

            {open && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    modalStyle={{ background: 'none' }}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <button className={cx('closeBtn')} onClick={handleClose}>
                        <AiOutlineClose />
                    </button>
                    <img id={cx('photo')} src={file} alt="expand" />
                </Modal>
            )}
        </div>
    );
};

export default CoachPhoto;
