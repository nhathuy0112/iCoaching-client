import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Photos.module.scss';

import ImageUploading from 'react-images-uploading';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { dataURItoBlob } from '~/utils/blob';
import { getPortfolioPhotosAsync, postPortfolioPhotosAsync } from '~/features/coachSlice';

const cx = classNames.bind(styles);

const Photos = () => {
    const dispatch = useDispatch();
    const { portfolioImages } = useSelector((state) => state.coach);
    const [images, setImages] = useState(portfolioImages);
    const maxNumber = 69;

    const onChange = (imageList) => {
        setImages(imageList);
        console.log(imageList);
    };

    useEffect(() => {
        dispatch(getPortfolioPhotosAsync());
    }, [dispatch]);

    useEffect(() => {
        setImages(portfolioImages);
    }, [portfolioImages]);

    const handleSubmit = () => {
        const formData = new FormData();
        images.forEach((image) => {
            if (image.hasOwnProperty('data_url')) {
                const blob = dataURItoBlob(image.data_url);
                formData.append('files', blob);
            } else {
                formData.append('files', image);
            }
        });
        dispatch(postPortfolioPhotosAsync(formData));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-wrapper')}>
                <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
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
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <AiOutlinePlus className={cx('icon')} />
                                    <span>Thêm ảnh</span>
                                </button>
                                <button id={cx('remove-all-btn')} onClick={onImageRemoveAll}>
                                    <BiTrash className={cx('icon')} />
                                    Xóa tất cả
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
                                                    <button id={cx('update-btn')} onClick={() => onImageUpdate(index)}>
                                                        <MdOutlineEdit />
                                                    </button>
                                                    <button id={cx('remove-btn')} onClick={() => onImageRemove(index)}>
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
            <button id={cx('save-btn')} onClick={handleSubmit}>
                Lưu
            </button>
        </div>
    );
};

export default Photos;
