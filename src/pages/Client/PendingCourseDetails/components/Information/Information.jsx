import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { completedContractAsync } from '~/features/clientSlice';
import { getContractDetailsAsync, sendReportAsync } from '~/features/contractSlice';
import { handleRenderGenders } from '~/utils/gender';
import { dataURItoBlob } from '~/utils/blob';

import Modal from '~/components/Modal';
import ErrorMessage from '~/components/ErrorMessage';
import ImageUploading from 'react-images-uploading';

import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';
import { BiTrash } from 'react-icons/bi';
import { BsCheckLg, BsXLg } from 'react-icons/bs';

import styles from './Information.module.scss';
import Spinner from '~/layouts/components/Spinner';

const cx = classNames.bind(styles);

const Information = () => {
    const dispatch = useDispatch();
    const { currentContract, loading } = useSelector((state) => state.contract);
    const { id, contractId } = useParams();
    const navigate = useNavigate();

    const [reportOpen, setReportOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [isAddingImage, setIsAddingImage] = useState(false);
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [imagesError, setImagesError] = useState('');
    const [contractLoading, setContractLoading] = useState(true);

    useEffect(() => {
        dispatch(getContractDetailsAsync(contractId))
            .unwrap()
            .then(() => setContractLoading(false));
    }, [dispatch, contractId]);

    const handleCompletedContract = () => {
        dispatch(completedContractAsync(contractId))
            .unwrap()
            .then(() => {
                toast.success('Hợp đồng đã được hoàn thành!');
                navigate(`/client/${id}/training-history`);
            });
    };

    const handleReportOpen = (e) => {
        e.preventDefault();
        setReportOpen(true);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        if (e.target.value.trim() === '') {
            setDescriptionError('Thông tin khiếu nại không được để trống');
        } else {
            setDescriptionError('');
        }
    };

    const onChange = (imageList) => {
        setImages(imageList);
        if (imageList.length === 0) {
            setImagesError('Ảnh phải được cập nhật ít nhất 1');
        } else {
            setImagesError('');
        }
    };

    const handlePostReport = () => {
        if (description === '' && images.length === 0) {
            setDescriptionError('Thông tin khiếu nại không được để trống');
            setImagesError('Ảnh phải được cập nhật ít nhất 1');
        } else {
            if (description === '') {
                setDescriptionError('Thông tin khiếu nại không được để trống');
            } else if (images.length === 0) {
                setImagesError('Ảnh phải được cập nhật ít nhất 1');
            } else {
                const formData = new FormData();
                formData.append('Desc', description);
                images.forEach((image) => {
                    if (image.hasOwnProperty('data_url')) {
                        const blob = dataURItoBlob(image.data_url);
                        formData.append('Files', blob);
                    } else {
                        formData.append('Files', image);
                    }
                });
                dispatch(sendReportAsync({ contractId, formData }));
                setIsAddingImage(false);
                setReportOpen(false);
            }
        }
    };

    const handleCancelAdding = () => {
        setIsAddingImage(false);
    };

    return (
        <div className={cx('wrapper')}>
            {contractLoading ? (
                <Spinner />
            ) : (
                <>
                    <div className={cx('content')}>
                        <div className={cx('contract-info')}>
                            <div className={cx('row-info')}>
                                <div className={cx('group-info', 'first-column')}>
                                    <label htmlFor="">Khách hàng</label>
                                    <span>{currentContract?.client?.fullname}</span>
                                </div>
                                <div className={cx('group-info', 'second-column')}>
                                    <label htmlFor="">Giới tính</label>
                                    <span>{handleRenderGenders(currentContract?.client?.gender)}</span>
                                </div>
                                <div className={cx('group-info', 'third-column')}>
                                    <label htmlFor="">Tuổi</label>
                                    <span>{currentContract?.client?.age}</span>
                                </div>
                                <div className={cx('group-info', 'fourth-column')}>
                                    <label htmlFor="">Email</label>
                                    <span>{currentContract?.client?.email}</span>
                                </div>
                                <div className={cx('group-info', 'fifth-column')}>
                                    <label htmlFor="">SĐT</label>
                                    <span>{currentContract?.client?.phoneNumber}</span>
                                </div>
                            </div>
                            <div className={cx('row-info')}>
                                <div className={cx('group-info', 'first-column')}>
                                    <label htmlFor="">Huấn luyện viên</label>
                                    <span>{currentContract?.coach?.fullname}</span>
                                </div>
                                <div className={cx('group-info', 'second-column')}>
                                    <label htmlFor="">Giới tính</label>
                                    <span>{handleRenderGenders(currentContract?.coach?.gender)}</span>
                                </div>
                                <div className={cx('group-info', 'third-column')}>
                                    <label htmlFor="">Tuổi</label>
                                    <span>{currentContract?.coach?.age}</span>
                                </div>
                                <div className={cx('group-info', 'fourth-column')}>
                                    <label htmlFor="">Email</label>
                                    <span>{currentContract?.coach?.email}</span>
                                </div>
                                <div className={cx('group-info', 'fifth-column')}>
                                    <label htmlFor="">SĐT</label>
                                    <span>{currentContract?.coach?.phoneNumber}</span>
                                </div>
                            </div>
                            <div className={cx('row-info')}>
                                <div className={cx('group-info', 'first-column')}>
                                    <label htmlFor="">Gói tập</label>
                                    <span>{currentContract?.courseName}</span>
                                </div>
                                <div className={cx('group-info', 'second-column')}>
                                    <label htmlFor="">Số buổi</label>
                                    <span>{currentContract?.duration}</span>
                                </div>
                                <div className={cx('group-info', 'third-column')}>
                                    <label htmlFor="">Trạng thái</label>
                                    <span>Đợi hoàn thành</span>
                                </div>
                                <div className={cx('group-info', 'fourth-column')}>
                                    <label htmlFor="">Giá</label>
                                    <span>{currentContract?.price}</span>
                                </div>
                            </div>
                            <div className={cx('row-info')}>
                                <div className={cx('group-info', 'description')}>
                                    <label htmlFor="">Mô tả</label>
                                    <span>{currentContract?.courseDescription}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentContract.isReported ? (
                        <span className={cx('reported')}>
                            Đã từ chối hoàn thành hợp đồng. Vui lòng xem khiếu nại đã gửi
                        </span>
                    ) : (
                        <div className={cx('action-btn')}>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <>
                                    <button id={cx('completed')} onClick={handleCompletedContract}>
                                        Hoàn thành
                                    </button>
                                    <button id={cx('rejected')} onClick={handleReportOpen}>
                                        Từ chối
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}

            {reportOpen && (
                <Modal
                    show={reportOpen}
                    onClose={() => setReportOpen(false)}
                    closeBtnStyle={{ display: 'none' }}
                    modalStyle={{ width: '65%', 'overflow-y': 'initial !important' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>Vui lòng ghi rõ lý do từ chối hoàn thành</h2>
                        <div className={cx('message-frame')}>
                            <textarea name="message" id="message" onChange={handleDescriptionChange} required />
                        </div>
                        {descriptionError && (
                            <div className={cx('error')}>
                                <ErrorMessage message={descriptionError} />
                            </div>
                        )}
                        <div className={cx('image-wrapper')}>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={20}
                                dataURLKey="data_url"
                                onClose={handleCancelAdding}
                            >
                                {({
                                    imageList,
                                    onImageUpload,
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
                                                onClick={() => {
                                                    setIsAddingImage(true);
                                                    onImageUpload();
                                                }}
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
                                                        <div
                                                            key={image.id ? image.id : index}
                                                            className={cx('image-item')}
                                                        >
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
                        {imagesError && (
                            <div className={cx('error')}>
                                <ErrorMessage message={imagesError} />
                            </div>
                        )}
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={handlePostReport}>
                                <BsCheckLg />
                                <span>Gửi</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setReportOpen(false)}>
                                <BsXLg />
                                <span>Hủy bỏ</span>
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Information;
