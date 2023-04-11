import classNames from 'classnames/bind';
import styles from './UpdateImage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { postPortfolioPhotosAsync } from '~/features/coachSlice';
import ImageUploading from 'react-images-uploading';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import { dataURItoBlob } from '~/utils/blob';
import { toast } from 'react-toastify';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const UpdateImage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading } = useSelector((state) => state.coach);
    const [isAddingImage, setIsAddingImage] = useState(false);

    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (imageList) => {
        setImages(imageList);
        console.log(imageList);
    };

    const handlePostImages = () => {
        const formData = new FormData();
        images.forEach((image) => {
            if (image.hasOwnProperty('data_url')) {
                const blob = dataURItoBlob(image.data_url);
                formData.append('files', blob);
            } else {
                formData.append('files', image);
            }
        });
        dispatch(postPortfolioPhotosAsync(formData))
            .unwrap()
            .then(() => {
                navigate(`/coach/${id}/portfolio`, { state: { isImagesGallery: true } });
                toast.success('Thêm ảnh thành công!');
            });
        setIsAddingImage(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <span
                    onClick={() => navigate(`/coach/${id}/portfolio`, { state: { isImagesGallery: true } })}
                    className={cx('back-link')}
                >
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </span>
                <h2 className={cx('title')}>Thư viện ảnh</h2>
            </div>
            <div className={cx('content')}>
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                        // write your building UI
                        <div className={cx('image-upload')}>
                            <div className={cx('action')}>
                                <button
                                    className={!loading ? cx('add-btn') : cx('add-btn', 'disabled')}
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={() => {
                                        setIsAddingImage(true);
                                        onImageUpload();
                                    }}
                                    disabled={loading}
                                    {...dragProps}
                                >
                                    <AiOutlinePlus className={cx('icon')} />
                                    <span>Thêm ảnh</span>
                                </button>
                            </div>
                            <div className={cx('image-list')}>
                                {imageList &&
                                    imageList.map((image, index) => {
                                        const handleRenderImage = (image) => {
                                            if (image.hasOwnProperty('data_url')) {
                                                return image['data_url'];
                                            } else {
                                                return image.url;
                                            }
                                        };
                                        return (
                                            <div key={image.id ? image.id : index} className={cx('image-item')}>
                                                <img src={handleRenderImage(image)} alt="" width="100" />
                                                <div className={cx('image-action')}>
                                                    {isAddingImage && (
                                                        <button
                                                            id={cx('update-btn')}
                                                            onClick={() => onImageUpdate(index)}
                                                        >
                                                            <MdOutlineEdit />
                                                        </button>
                                                    )}
                                                    {loading ? (
                                                        ''
                                                    ) : (
                                                        <button
                                                            id={cx('remove-btn')}
                                                            onClick={() => onImageRemove(index)}
                                                        >
                                                            <BiTrash />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </ImageUploading>
                {images?.length > 0 && (
                    <button id={cx('save-btn')} onClick={handlePostImages}>
                        <span>{loading ? <Spinner /> : 'Lưu'}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default UpdateImage;
