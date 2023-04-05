import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditTrainingLog.module.scss';
import { useEffect, useState } from 'react';
import {
    deleteContractLogMediaAsync,
    deleteContractProgramFileAsync,
    getContractLogDetailsAsync,
    getContractLogsAsync,
    updateContractLogAsync,
} from '~/features/contractSlice';
import { convertDateFormat, convertDateFormatToInput } from '~/utils/dateFormat';
import moment from 'moment';
import ErrorMessage from '~/components/ErrorMessage';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { handleRenderFileIcon } from '~/utils/file';
import Spinner from '~/layouts/components/Spinner';

const cx = classNames.bind(styles);

const EditTrainingLog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentLog, logs, loading } = useSelector((state) => state.contract);
    const { id, contractId, logId } = useParams();
    const [trainingDateInput, setTrainingDateInput] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [noteInput, setNoteInput] = useState('');
    const [trainingDateError, setTrainingDateError] = useState('');
    const [noteError, setNoteError] = useState('');

    const [deleteFileLoading, setDeleteFileLoading] = useState({ id, isDeleting: false });
    const [deleteImageLoading, setDeleteImageLoading] = useState({ id, isDeleting: false });
    const [deleteVideoLoading, setDeleteVideoLoading] = useState({ id, isDeleting: false });

    useEffect(() => {
        dispatch(getContractLogsAsync(contractId));
    }, [dispatch, contractId]);

    useEffect(() => {
        dispatch(getContractLogDetailsAsync({ contractId: contractId, logId: logId }));
    }, [dispatch, contractId, logId]);

    useEffect(() => {
        if (currentLog) {
            setTrainingDateInput(convertDateFormatToInput(currentLog.trainingDate));
            setFileList(currentLog.files);
            setImageList(currentLog.images);
            setVideoList(currentLog.videos);
            setNoteInput(currentLog.note);
        }
    }, [currentLog]);

    const handleTrainingDateChange = (e) => {
        const newTrainingDateInput = e.target.value;
        setTrainingDateInput(newTrainingDateInput);
        if (!newTrainingDateInput) {
            setTrainingDateError('');
        } else {
            const today = moment();
            const trainingDate = moment(newTrainingDateInput);
            let prevTrainingDate = null;
            let nextTrainingDate = null;
            for (let i = 0; i < logs.length; i++) {
                if (logs[i].id === currentLog.id - 1) {
                    prevTrainingDate = logs[i].trainingDate;
                } else if (logs[i].id === currentLog.id + 1) {
                    nextTrainingDate = logs[i].trainingDate;
                }
            }

            if (trainingDate.isAfter(today, 'day')) {
                setTrainingDateError('Ngày tập luyện không được chọn trong tương lai');
            } else if (
                prevTrainingDate !== null &&
                trainingDate.isBefore(moment(convertDateFormatToInput(prevTrainingDate)), 'day')
            ) {
                setTrainingDateError(`Ngày tập luyện không được nhỏ hơn ngày tập luyện trước đó (${prevTrainingDate})`);
            } else if (
                prevTrainingDate !== null &&
                trainingDate.isSame(moment(convertDateFormatToInput(prevTrainingDate)), 'day')
            ) {
                setTrainingDateError(
                    `Ngày tập luyện không được trùng với ngày tập luyện trước đó (${prevTrainingDate})`,
                );
            } else if (
                nextTrainingDate !== null &&
                trainingDate.isAfter(moment(convertDateFormatToInput(nextTrainingDate)), 'day')
            ) {
                setTrainingDateError(`Ngày tập luyện không được lớn hơn ngày tập luyện kế tiếp (${nextTrainingDate})`);
            } else if (
                nextTrainingDate !== null &&
                trainingDate.isSame(moment(convertDateFormatToInput(nextTrainingDate)), 'day')
            ) {
                setTrainingDateError(
                    `Ngày tập luyện không được trùng với ngày tập luyện kế tiếp (${nextTrainingDate})`,
                );
            } else {
                setTrainingDateError('');
            }
        }
    };

    const handleNoteChange = (e) => {
        setNoteInput(e.target.value);
        if (e.target.value.trim() === '') {
            setNoteError('Ghi chú không được để trống');
        } else {
            setNoteError('');
        }
    };

    const handleFileListChange = (event) => {
        const file = event.target.files[0];
        file.id = Date.now();
        file.fileName = file.name;
        setFileList([...fileList, file]);
    };

    const handleDeleteFile = (fileId) => {
        let found = false;
        setDeleteFileLoading({ id: fileId, isDeleting: true });

        for (let i = 0; i < currentLog.files.length; i++) {
            if (currentLog.files[i].id === fileId) {
                found = true;
                dispatch(deleteContractProgramFileAsync({ contractId: contractId, fileId: fileId }))
                    .unwrap()
                    .then(() => {
                        setDeleteFileLoading({ isDeleting: false });
                        dispatch(getContractLogDetailsAsync({ contractId: contractId, logId: logId }));
                    });
                break;
            }
        }
        if (!found) {
            setDeleteFileLoading({ id: fileId, isDeleting: true });
            const newFileList = fileList.filter((file) => file.id !== fileId);
            setTimeout(() => {
                setFileList(newFileList);
                setDeleteFileLoading({ isDeleting: false });
            }, [3000]);
        }
    };

    const handleImageListChange = (event) => {
        const image = event.target.files[0];
        image.id = Date.now();
        image.url = URL.createObjectURL(image);
        setImageList([...imageList, image]);
    };

    const handleDeleteImage = (imageId) => {
        setDeleteImageLoading({ id: imageId, isDeleting: true });
        let found = false;
        for (let i = 0; i < currentLog.images.length; i++) {
            if (currentLog.images[i].id === imageId) {
                found = true;
                dispatch(deleteContractLogMediaAsync({ contractId: contractId, logId: logId, mediaId: imageId }))
                    .unwrap()
                    .then(() => {
                        setDeleteImageLoading({ isDeleting: false });
                        dispatch(getContractLogDetailsAsync({ contractId: contractId, logId: logId }));
                    });
                break;
            }
        }
        if (!found) {
            setDeleteImageLoading({ id: imageId, isDeleting: true });
            const newImageList = imageList.filter((image) => image.id !== imageId);
            setTimeout(() => {
                setDeleteImageLoading({ isDeleting: false });
                setImageList(newImageList);
            }, [3000]);
        }
    };

    const handleVideoListChange = (event) => {
        const video = event.target.files[0];
        video.id = Date.now();
        video.url = URL.createObjectURL(video);
        setVideoList([...videoList, video]);
    };

    const handleDeleteVideo = (videoId) => {
        setDeleteVideoLoading({ id: videoId, isDeleting: true });
        let found = false;
        for (let i = 0; i < currentLog.videos.length; i++) {
            if (currentLog.videos[i].id === videoId) {
                found = true;
                dispatch(deleteContractLogMediaAsync({ contractId: contractId, logId: logId, mediaId: videoId }))
                    .unwrap()
                    .then(() => {
                        setDeleteVideoLoading({ isDeleting: false });
                        dispatch(getContractLogDetailsAsync({ contractId: contractId, logId: logId }));
                    });
                break;
            }
        }
        if (!found) {
            setDeleteVideoLoading({ id: videoId, isDeleting: true });
            const newVideoList = videoList.filter((video) => video.id !== videoId);
            setTimeout(() => {
                setDeleteVideoLoading({ isDeleting: false });
                setVideoList(newVideoList);
            }, [3000]);
        }
    };

    const handleUpdateTrainingLog = () => {
        if (!trainingDateInput && !noteInput) {
            setTrainingDateError('Ngày tập luyện phải được chọn');
            setNoteError('Ghi chú phải được thêm');
        } else {
            if (!trainingDateInput) {
                setTrainingDateError('Ngày tập luyện phải được chọn');
            } else if (!noteInput) {
                setNoteError('Ghi chú phải được thêm');
            } else {
                const formData = new FormData();
                formData.append('TrainingDate', convertDateFormat(trainingDateInput));
                formData.append('Note', noteInput);
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    formData.append('Files', file);
                }
                for (let i = 0; i < imageList.length; i++) {
                    const image = imageList[i];
                    formData.append('Images', image);
                }
                for (let i = 0; i < videoList.length; i++) {
                    const video = videoList[i];
                    formData.append('Videos', video);
                }

                dispatch(updateContractLogAsync({ contractId: contractId, logId: logId, payload: formData }))
                    .unwrap()
                    .then(() => {
                        setTrainingDateError('');
                        navigate(`/coach/${id}/my-clients/view-details/${contractId}`, {
                            state: { isEditTrainingLog: true },
                        });
                    });
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <div
                    onClick={() => {
                        navigate(`/coach/${id}/my-clients/view-details/${contractId}`, {
                            state: { isEditTrainingLog: true },
                        });
                    }}
                    className={cx('back-link')}
                >
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </div>
                <h2 className={cx('title')}>Cập nhật tiến độ</h2>
            </div>
            <div className={cx('content')}>
                <h4 className={cx('day')}>Ngày {currentLog.dateNo}</h4>
                <div id={cx('edit-form')}>
                    <div className={cx('input-group', 'training-date')}>
                        <label htmlFor="training-date">Ngày tập luyện</label>
                        <input
                            type="date"
                            placeholder="dd/mm/yyyy"
                            className={cx('date-input')}
                            value={trainingDateInput}
                            onChange={handleTrainingDateChange}
                        />
                    </div>
                    {trainingDateError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={trainingDateError} />
                        </div>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Tệp đính kèm</label>
                        <div className={cx('file-inputs')}>
                            <input type="file" onChange={handleFileListChange} />
                            <button>
                                <i>
                                    <AiOutlineUpload />
                                </i>
                                Click để thêm
                            </button>
                        </div>
                    </div>
                    {fileList && fileList.length > 0 && (
                        <ul className={cx('file-list')}>
                            {fileList.map((file) => (
                                <li className={cx('file-item')} key={file.id}>
                                    <span>{handleRenderFileIcon(file.fileName)}</span>
                                    <p>{file.fileName}</p>

                                    <div className={cx('action')} onClick={() => handleDeleteFile(file.id)}>
                                        {deleteFileLoading.isDeleting && file.id === deleteFileLoading.id ? (
                                            <Spinner />
                                        ) : (
                                            <>{deleteFileLoading.isDeleting ? '' : <FaTrashAlt />}</>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Ảnh</label>
                        <div className={cx('file-inputs')}>
                            <input type="file" accept="image/*" onChange={handleImageListChange} />
                            <button>
                                <i>
                                    <AiOutlineUpload />
                                </i>
                                Click để thêm
                            </button>
                        </div>
                    </div>

                    {imageList && imageList.length > 0 && (
                        <ul className={cx('image-list')}>
                            {imageList.map((image) => (
                                <li className={cx('image-item')} key={image.id}>
                                    <img src={image.url} alt="log" />
                                    <button className={cx('delete-btn')} onClick={() => handleDeleteImage(image.id)}>
                                        {deleteImageLoading.isDeleting && image.id === deleteImageLoading.id ? (
                                            <Spinner />
                                        ) : (
                                            <>{deleteImageLoading.isDeleting ? '' : <FaTrashAlt />}</>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Video</label>
                        <div className={cx('file-inputs')}>
                            <input type="file" accept="video/*" onChange={handleVideoListChange} />
                            <button>
                                <i>
                                    <AiOutlineUpload />
                                </i>
                                Click để thêm
                            </button>
                        </div>
                    </div>
                    {videoList && videoList.length > 0 && (
                        <ul className={cx('video-list')}>
                            {videoList.map((video) => (
                                <li className={cx('video-item')} key={video.id}>
                                    <video controls>
                                        <source src={video.url} />
                                    </video>
                                    <button className={cx('delete-btn')} onClick={() => handleDeleteVideo(video.id)}>
                                        {deleteVideoLoading.isDeleting && video.id === deleteVideoLoading.id ? (
                                            <Spinner />
                                        ) : (
                                            <>{deleteVideoLoading.isDeleting ? '' : <FaTrashAlt />}</>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={cx('input-group', 'note')}>
                        <label htmlFor="note">Ghi chú</label>
                        <textarea name="note" value={noteInput ? noteInput : ''} onChange={handleNoteChange} />
                    </div>
                    {noteError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={noteError} />
                        </div>
                    )}
                    <div className={cx('action-btn')}>
                        <button className={cx('save-btn')} onClick={handleUpdateTrainingLog} disabled={loading}>
                            {loading &&
                            !deleteFileLoading.isDeleting &&
                            !deleteImageLoading.isDeleting &&
                            !deleteVideoLoading.isDeleting ? (
                                <Spinner />
                            ) : (
                                'Lưu'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTrainingLog;
