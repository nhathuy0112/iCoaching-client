import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Photos.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfolioPhotosAsync, removePortfolioPhotosAsync } from '~/features/coachSlice';
import Pagination from '~/components/Pagination';
import Spinner from '~/components/Spinner';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from '~/components/Modal/Modal';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
const cx = classNames.bind(styles);

const Photos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { portfolioImages, totalCount, pageSize, loading } = useSelector((state) => state.coach);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState({});
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(getPortfolioPhotosAsync({ pageIndex: currentPage, pageSize: 15 }));
    }, [dispatch, currentPage]);

    const handleOpenDeleteModal = (image) => {
        setSelectedImage(image);
        setIsOpenDeleteModal(true);
    };

    const handleDeleteImage = (id) => {
        dispatch(removePortfolioPhotosAsync(id))
            .unwrap()
            .then(() => {
                setIsOpenDeleteModal(false);
                dispatch(getPortfolioPhotosAsync({ pageIndex: currentPage, pageSize: 15 }));
                toast.success('Xóa ảnh thành công!');
            });
    };

    return (
        <div className={cx('wrapper')}>
            {portfolioImages && portfolioImages.length > 0 ? (
                <>
                    <div className={cx('action')}>
                        <button id={cx('add-btn')} onClick={() => navigate('update-images')}>
                            Thêm ảnh
                        </button>
                    </div>
                    <div className={cx('image-list')}>
                        {portfolioImages.map((image) => (
                            <div className={cx('image-item')} key={image.id}>
                                <img src={image.url} alt="portfolio" />
                                <div className={cx('image-action')} onClick={() => handleOpenDeleteModal(image)}>
                                    <button id={cx('remove-btn')}>
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <Pagination
                            className={cx('pagination-bar')}
                            currentPage={currentPage}
                            totalCount={totalCount}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </>
            ) : (
                <div className={cx('image-empty')}>
                    <h2>Bạn chưa cập nhật ảnh nào!</h2>
                    <Link className={cx('update-link')} to="update-images">
                        Cập nhật tại đây
                    </Link>
                </div>
            )}
            {isOpenDeleteModal && (
                <Modal
                    id={cx('delete-modal')}
                    show={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Bạn có đồng ý xóa hình ảnh ở dưới?</h2>
                        <div className={cx('image')}>
                            <img src={selectedImage.url} alt="gallery" />
                        </div>
                        <div className={cx('modal-action')}>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <>
                                    <button
                                        id={cx('agree-btn')}
                                        type="submit"
                                        onClick={() => {
                                            handleDeleteImage(selectedImage.id);
                                        }}
                                    >
                                        <BsCheckLg />
                                        <span>Đồng ý</span>
                                    </button>
                                    <button id={cx('cancel-btn')} onClick={() => setIsOpenDeleteModal(false)}>
                                        <BsXLg />
                                        <span>Hủy bỏ</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Photos;
