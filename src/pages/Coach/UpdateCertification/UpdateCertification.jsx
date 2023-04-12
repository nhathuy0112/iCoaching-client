import classNames from 'classnames/bind';
import styles from './UpdateCertification.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataURItoBlob } from '~/utils/blob';
import { certificationSubmitAsync } from '~/features/coachSlice';
import { toast } from 'react-toastify';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const UpdateCertification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [idImages, setIdImages] = useState([]);
    const [certImages, setCertImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const maxNumber = 69;

    const onIdImagesChange = (imageList) => {
        setIdImages(imageList);
    };

    const onCertImagesChange = (imageList) => {
        setCertImages(imageList);
    };

    const handleSendCertificationRequest = () => {
        setLoading(true);
        const formData = new FormData();
        idImages.forEach((image) => {
            if (image.hasOwnProperty('data_url')) {
                const blob = dataURItoBlob(image.data_url);
                formData.append('idImages', blob);
            } else {
                formData.append('idImages', image);
            }
        });
        certImages.forEach((image) => {
            if (image.hasOwnProperty('data_url')) {
                const blob = dataURItoBlob(image.data_url);
                formData.append('certImages', blob);
            } else {
                formData.append('certImages', image);
            }
        });
        dispatch(certificationSubmitAsync(formData))
            .unwrap()
            .then(() => {
                toast.success('Gửi yêu cầu thành công!');
                navigate(`/coach/${id}/verify`);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title-and-back')}>
                    <div className={cx('back')}>
                        <Link to={`/coach/${id}/verify`} className={cx('back-link')}>
                            <IoIosArrowBack />
                            <span>Quay lại</span>
                        </Link>
                    </div>
                    <h2 className={cx('title')}>Cập nhật thông tin</h2>
                </div>
                <div className={cx('main')}>
                    <div className={cx('info-group')}>
                        <h3 className={cx('title')}>Giấy tờ tùy thân</h3>
                        <div className={cx('image-wrapper')}>
                            <ImageUploading
                                multiple
                                value={idImages}
                                onChange={onIdImagesChange}
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
                                                className={!loading ? cx('add-btn') : cx('add-btn', 'disabled')}
                                                disabled={loading}
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <AiOutlinePlus className={cx('icon')} />
                                                <span>Thêm ảnh</span>
                                            </button>
                                            <button
                                                className={
                                                    !loading ? cx('remove-all-btn') : cx('remove-all-btn', 'disabled')
                                                }
                                                disabled={loading}
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
                                                                hidden={loading}
                                                                id={cx('update-btn')}
                                                                onClick={() => onImageUpdate(index)}
                                                            >
                                                                <MdOutlineEdit />
                                                            </button>
                                                            <button
                                                                hidden={loading}
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
                    </div>
                    <div className={cx('info-group')}>
                        <h3 className={cx('title')}>Chứng chỉ huấn luyện</h3>
                        <div className={cx('image-wrapper')}>
                            <ImageUploading
                                multiple
                                value={certImages}
                                onChange={onCertImagesChange}
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
                                                className={!loading ? cx('add-btn') : cx('add-btn', 'disabled')}
                                                disabled={loading}
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <AiOutlinePlus className={cx('icon')} />
                                                <span>Thêm ảnh</span>
                                            </button>
                                            <button
                                                className={
                                                    !loading ? cx('remove-all-btn') : cx('remove-all-btn', 'disabled')
                                                }
                                                disabled={loading}
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
                                                                hidden={loading}
                                                            >
                                                                <MdOutlineEdit />
                                                            </button>
                                                            <button
                                                                id={cx('remove-btn')}
                                                                onClick={() => onImageRemove(index)}
                                                                hidden={loading}
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
                    </div>
                    {idImages.length > 0 && certImages.length > 0 && (
                        <div className={cx('action-btn')}>
                            <button id={cx('send-btn')} onClick={handleSendCertificationRequest}>
                                {loading ? <Spinner /> : 'Gửi'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateCertification;
