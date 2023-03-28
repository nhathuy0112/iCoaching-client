import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditTrainingLog.module.scss';
import { useEffect, useState } from 'react';
import { getContractLogDetailsAsync, getContractLogsAsync, updateContractLogAsync } from '~/features/contractSlice';
import { convertDateFormat, convertDateFormatToInput } from '~/utils/dateFormat';
import moment from 'moment';
import ErrorMessage from '~/components/ErrorMessage';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { handleRenderFileIcon } from '~/utils/file';

const cx = classNames.bind(styles);

const EditTrainingLog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentLog, logs } = useSelector((state) => state.contract);
    const { id, contractId, logId } = useParams();
    const [trainingDateInput, setTrainingDateInput] = useState('');
    const [fileList, setFileList] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [videoList, setVideoList] = useState([]);
    const [noteInput, setNoteInput] = useState('');
    const [trainingDateError, setTrainingDateError] = useState('');
    const [fileError, setFileError] = useState('');
    const [imageError, setImageError] = useState('');
    const [videoError, setVideoError] = useState('');
    const [invalidImage, setInvalidImage] = useState(false);
    const [invalidVideo, setInvalidVideo] = useState(false);

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
            for (let i = 0; i < logs.length; i++) {
                if (logs[i].id === currentLog.id - 1) {
                    prevTrainingDate = logs[i].trainingDate;
                    break;
                }
            }

            if (trainingDate.isBefore(today, 'day')) {
                setTrainingDateError('Ngày tập luyện không được chọn trong quá khứ');
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
            } else {
                setTrainingDateError('');
            }
        }
    };

    const handleFileListChange = (event) => {
        const file = event.target.files[0];
        file.id = Date.now();
        file.fileName = file.name;
        setFileList([...fileList, file]);
        if (fileList) setFileError('');
    };

    const handleDeleteFile = (fileId) => {
        const newFileList = fileList.filter((file) => file.id !== fileId);
        setFileList(newFileList);
    };

    const handleImageListChange = (event) => {
        const image = event.target.files[0];
        image.id = Date.now();
        image.url = URL.createObjectURL(image);
        setImageList([...imageList, image]);
        //check type of image
        if (image.type === 'image/jpeg' || image.type === 'image/avif' || image.type === 'image/png') {
            setInvalidImage(false);
        } else {
            setInvalidImage(true);
        }
    };

    const handleDeleteImage = (imageId) => {
        const newImageList = imageList.filter((image) => image.id !== imageId);
        setImageList(newImageList);
        // If image invalid and deleted all => setInvalid = false
        if (invalidImage && newImageList.length === 0) {
            setInvalidImage(false);
        }
    };

    const handleVideoListChange = (event) => {
        const video = event.target.files[0];
        video.id = Date.now();
        video.url = URL.createObjectURL(video);
        setVideoList([...videoList, video]);
        if (videoList) setVideoError('');
        // check type of video
        if (video.type === 'video/mp4' || video.type === 'video/avi') {
            setInvalidVideo(false);
        } else {
            setInvalidVideo(true);
        }
    };

    const handleDeleteVideo = (videoId) => {
        const newVideoList = videoList.filter((video) => video.id !== videoId);
        setVideoList(newVideoList);
        // If video invalid and deleted all => setInvalid = false
        if (invalidVideo && newVideoList.length === 0) {
            setInvalidVideo(false);
        }
    };

    console.log(fileList);

    const handleUpdateTrainingLog = () => {
        const today = moment();
        const trainingDate = moment(trainingDateInput);
        let errorFlag = false;
        if (!trainingDateInput) {
            setTrainingDateError('Ngày tập luyện phải được chọn');
            errorFlag = true;
        } else if (trainingDate.isBefore(today, 'day')) {
            setTrainingDateError('Ngày tập luyện không được chọn trong quá khứ');
            errorFlag = true;
        }
        if (fileList.length === 0) {
            setFileError('Tệp phải được tải lên ít nhất 1');
            errorFlag = true;
        }
        if (imageList.length === 0) {
            setImageError('Ảnh phải được tải lên ít nhất 1');
            errorFlag = true;
        }
        if (videoList.length === 0) {
            setVideoError('Video phải được tải lên ít nhất 1');
            errorFlag = true;
        }
        if (errorFlag) {
            return;
        }
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
                setFileError('');
                setVideoError('');
                setImageError('');
                navigate(`/coach/${id}/my-clients/view-details/${contractId}`, {
                    state: { isEditTrainingLog: true },
                });
            });
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
                                        <div className={cx('loading')}></div>
                                        <FaTrashAlt />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {fileError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={fileError} />
                        </div>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Ảnh</label>
                        <div className={cx('file-inputs')}>
                            <input type="file" onChange={handleImageListChange} />
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
                                        <FaTrashAlt />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {invalidImage && (
                        <div className={cx('error')}>
                            <ErrorMessage message="Ảnh phải có định dạng .jpeg/jpg, .png hoặc .avif" />
                        </div>
                    )}
                    {imageError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={imageError} />
                        </div>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Video</label>
                        <div className={cx('file-inputs')}>
                            <input type="file" onChange={handleVideoListChange} />
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
                                        <FaTrashAlt />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {invalidVideo && (
                        <div className={cx('error')}>
                            <ErrorMessage message="Video phải có định dạng .mp4 hoặc .avi" />
                        </div>
                    )}
                    {videoError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={videoError} />
                        </div>
                    )}
                    <div className={cx('input-group', 'note')}>
                        <label htmlFor="note">Ghi chú</label>
                        <textarea
                            name="note"
                            value={noteInput ? noteInput : ''}
                            onChange={(e) => setNoteInput(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className={
                        trainingDateError || fileError || imageError || videoError || invalidImage || invalidVideo
                            ? cx('save-btn', 'disabled')
                            : cx('save-btn')
                    }
                    onClick={handleUpdateTrainingLog}
                >
                    Lưu
                </button>
            </div>
        </div>
    );
};

export default EditTrainingLog;
