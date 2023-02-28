import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Verify.module.scss';

import ImageUploading from 'react-images-uploading';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiTrash } from 'react-icons/bi';
import { MdOutlineEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { certificationSubmitAsync } from '~/features/coachSlice';

const cx = classNames.bind(styles);

const Verify = () => {
    const dispatch = useDispatch();
    const [images, setImages] = useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const handleSubmit = () => {
        dispatch(certificationSubmitAsync({ file: images }));
    };

    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>Xác minh tài khoản</h4>
            <div className={cx('content')}>
                <div className={cx('notification')}>
                    <p>Bạn cần xác minh mình là Huấn luyện viên trước khi tham gia huấn luyện cho khách hàng !</p>
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
                                    {imageList.map((image, index) => (
                                        <div key={index} className={cx('image-item')}>
                                            <img src={image['data_url']} alt="" width="100" />
                                            <div className={cx('image-action')}>
                                                <button id={cx('update-btn')} onClick={() => onImageUpdate(index)}>
                                                    <MdOutlineEdit />
                                                </button>
                                                <button id={cx('remove-btn')} onClick={() => onImageRemove(index)}>
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
            </div>
            {images && (
                <button id={cx('send-btn')} onClick={handleSubmit}>
                    Gửi
                </button>
            )}
        </div>
    );
};

export default Verify;
