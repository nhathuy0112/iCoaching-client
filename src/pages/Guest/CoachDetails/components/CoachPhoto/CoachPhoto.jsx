import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CoachPhoto.module.scss';
import classNames from 'classnames/bind';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination';

import { AiOutlineClose } from 'react-icons/ai';

import { useSelector, useDispatch } from 'react-redux';
import { getCoachPhotosAsync, setPage } from '~/features/guestSlice';

const cx = classNames.bind(styles);

const CoachPhoto = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    const { coachId } = useParams();
    const dispatch = useDispatch();
    const { photos, totalCount, pageIndex } = useSelector((state) => state.guest);

    useEffect(() => {
        dispatch(getCoachPhotosAsync({ coachId: coachId, pageIndex: pageIndex, pageSize: 8 }));
    }, [dispatch, coachId, pageIndex]);

    //Pagination
    const [pageChange, setPageChange] = useState(pageIndex);

    const handlePageChange = (pageNumber) => {
        setPageChange(pageNumber);
        dispatch(setPage(pageNumber));
        dispatch(getCoachPhotosAsync({ coachId: coachId, pageIndex: pageNumber, pageSize: 8 }));
    };

    const currentPhotoPagination = useMemo(() => {
        return photos;
    }, [photos]);

    const handleOpen = (e) => {
        setOpen(true);
        setFile(e);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {photos.length !== 0 ? (
                    <div className={cx('image-list')}>
                        {currentPhotoPagination.map((item, index) => (
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
                currentPage={pageChange}
                totalCount={totalCount}
                pageSize={8}
                onPageChange={(pageChange) => handlePageChange(pageChange)}
            />
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
