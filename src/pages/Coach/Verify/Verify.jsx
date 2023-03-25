import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Verify.module.scss';

import ImageUploading from 'react-images-uploading';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
    certificationSubmitAsync,
    getCertificationAsync,
    resetCertificationImages,
    resetEditor,
    resetPortfolioImages,
} from '~/features/coachSlice';

import Spinner from '~/layouts/components/Spinner';
import SuccessMessage from '~/components/SuccessMessage';
import { dataURItoBlob } from '~/utils/blob';
import ErrorMessage from '~/components/ErrorMessage';
const cx = classNames.bind(styles);

const Verify = () => {
    const dispatch = useDispatch();
    const { certificationImages, status } = useSelector((state) => state.coach);
    const { currentUser } = useSelector((state) => state.user);
    const [images, setImages] = useState(certificationImages);
    const [loading, setLoading] = useState(false);

    const maxNumber = 69;

    const onChange = (imageList) => {
        setImages(imageList);
    };

    useEffect(() => {
        dispatch(getCertificationAsync()).then(() => setLoading(false));
    }, [dispatch, status]);

    useEffect(() => {
        if (certificationImages) setImages(certificationImages);
    }, [certificationImages]);

    useEffect(() => {
        if (currentUser === null) {
            dispatch(resetCertificationImages());
            dispatch(resetEditor());
            dispatch(resetPortfolioImages());
        }
    }, [currentUser, dispatch]);

    const handleRenderUploadingByStatus = (status) => {
        if (currentUser?.IsVerified === 'True') {
            return (
                <>
                    <div className={cx('message')}>
                        <SuccessMessage
                            message={'Chứng chỉ của bạn đã được xác nhận. Bạn có thể tham gia huấn luyện'}
                        />
                    </div>
                </>
            );
        } else {
            switch (status) {
                case null || undefined:
                    return (
                        <>
                            <div className={cx('notification')}>
                                <p>
                                    Bạn cần xác minh mình là Huấn luyện viên trước khi tham gia huấn luyện cho khách
                                    hàng !
                                </p>
                                <p>Vui lòng cập nhật ít nhất một ảnh của chứng chỉ huấn luyện !</p>
                            </div>
                            <div className={cx('image-wrapper')}>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div className={cx('image-upload')}>
                                            <div className={cx('action')}>
                                                <button
                                                    id={cx('add-btn')}
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    className={status === 'Pending' ? cx('disabled') : ''}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <AiOutlinePlus className={cx('icon')} />
                                                    <span>Thêm ảnh</span>
                                                </button>
                                                <button
                                                    id={cx('remove-all-btn')}
                                                    className={status === 'Pending' ? cx('disabled') : ''}
                                                    onClick={onImageRemoveAll}
                                                >
                                                    <BiTrash className={cx('icon')} />
                                                    Xóa tất cả
                                                </button>
                                            </div>
                                            <div className={cx('image-list')}>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className={cx('image-item')}>
                                                        <img src={image['data_url']} alt="" width="100" />
                                                        <div className={cx('image-action')}>
                                                            <button
                                                                id={cx('update-btn')}
                                                                onClick={() => onImageUpdate(index)}
                                                            >
                                                                <MdOutlineEdit />
                                                            </button>
                                                            <button
                                                                id={cx('remove-btn')}
                                                                onClick={() => onImageRemove(index)}
                                                            >
                                                                <BiTrash />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                            <button
                                id={cx('send-btn')}
                                className={status === 'Pending' ? cx('disabled') : ''}
                                onClick={handleSubmit}
                            >
                                Gửi
                            </button>
                        </>
                    );
                case 'Pending':
                    return (
                        <>
                            <div className={cx('image-wrapper')}>
                                <div className={cx('image-upload')}>
                                    <div className={cx('image-list')}>
                                        {certificationImages.map((image) => (
                                            <div key={image} className={cx('image-item')}>
                                                <img src={image} alt="" width="100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('message')}>
                                <SuccessMessage message={'Chứng chỉ của bạn đang chờ được Quản lý xác nhận'} />
                            </div>
                        </>
                    );
                case 'Accepted':
                    return (
                        <>
                            <div className={cx('image-wrapper')}>
                                <div className={cx('image-upload')}>
                                    <div className={cx('image-list')}>
                                        {certificationImages.map((image) => (
                                            <div key={image} className={cx('image-item')}>
                                                <img src={image} alt="" width="100" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('message')}>
                                <SuccessMessage
                                    message={'Chứng chỉ của bạn đã được xác nhận. Bạn có thể tham gia huấn luyện'}
                                />
                            </div>
                        </>
                    );
                case 'Denied':
                    return (
                        <>
                            <div className={cx('notification')}>
                                <p>
                                    Bạn cần xác minh mình là Huấn luyện viên trước khi tham gia huấn luyện cho khách
                                    hàng !
                                </p>
                                <p>Vui lòng cập nhật ít nhất một ảnh của chứng chỉ huấn luyện !</p>
                            </div>
                            <div className={cx('image-wrapper')}>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div className={cx('image-upload')}>
                                            <div className={cx('action')}>
                                                <button
                                                    id={cx('add-btn')}
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    className={status === 'Pending' ? cx('disabled') : ''}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    <AiOutlinePlus className={cx('icon')} />
                                                    <span>Thêm ảnh</span>
                                                </button>
                                                <button
                                                    id={cx('remove-all-btn')}
                                                    className={status === 'Pending' ? cx('disabled') : ''}
                                                    onClick={onImageRemoveAll}
                                                >
                                                    <BiTrash className={cx('icon')} />
                                                    Xóa tất cả
                                                </button>
                                            </div>
                                            <div className={cx('image-list')}>
                                                {imageList.map((image, index) => {
                                                    const handleRenderImage = (image) => {
                                                        if (image.hasOwnProperty('data_url')) {
                                                            return image['data_url'];
                                                        } else {
                                                            return image;
                                                        }
                                                    };
                                                    return (
                                                        <div key={index} className={cx('image-item')}>
                                                            <img src={handleRenderImage(image)} alt="" width="100" />
                                                            <div className={cx('image-action')}>
                                                                <button
                                                                    id={cx('update-btn')}
                                                                    onClick={() => onImageUpdate(index)}
                                                                >
                                                                    <MdOutlineEdit />
                                                                </button>
                                                                <button
                                                                    id={cx('remove-btn')}
                                                                    onClick={() => onImageRemove(index)}
                                                                >
                                                                    <BiTrash />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>
                            <div className={cx('message', 'warning')}>
                                <ErrorMessage message={'Chứng chỉ của bạn không hợp lệ. Vui lòng cập nhật lại'} />
                            </div>
                            <button id={cx('send-btn')} onClick={handleSubmit}>
                                Gửi
                            </button>
                        </>
                    );
                default:
                    return;
            }
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        const formData = new FormData();
        images.forEach((image) => {
            if (image.hasOwnProperty('data_url')) {
                const blob = dataURItoBlob(image.data_url);
                formData.append('files', blob);
            } else {
                formData.append('files', image);
            }
        });
        dispatch(certificationSubmitAsync(formData));
    };

    return (
        <div className={cx('wrapper')}>
            {/* <h4 className={cx('title')}>Xác minh tài khoản</h4> */}
            {loading ? <Spinner /> : <div className={cx('content')}>{handleRenderUploadingByStatus(status)}</div>}
        </div>
    );
};

export default Verify;
