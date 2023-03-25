import classNames from 'classnames/bind';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditTrainingLog.module.scss';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { getContractLogDetailsAsync, getContractLogsAsync, updateContractLogAsync } from '~/features/contractSlice';
import { convertDateFormat, convertDateFormatToInput } from '~/utils/dateFormat';
import moment from 'moment';
import ErrorMessage from '~/components/ErrorMessage';

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: true,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

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

    useEffect(() => {
        dispatch(getContractLogsAsync(contractId));
    }, [dispatch, contractId]);

    useEffect(() => {
        dispatch(getContractLogDetailsAsync({ contractId: contractId, logId: logId }));
    }, [dispatch, contractId, logId]);

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
            } else if (prevTrainingDate !== null && trainingDate.isBefore(prevTrainingDate, 'day')) {
                setTrainingDateError(`Ngày tập luyện không được nhỏ hơn ngày tập luyện trước đó (${prevTrainingDate})`);
            } else if (prevTrainingDate !== null && trainingDate.isSame(prevTrainingDate, 'day')) {
                setTrainingDateError(
                    `Ngày tập luyện không được trùng với ngày tập luyện trước đó (${prevTrainingDate})`,
                );
            } else {
                setTrainingDateError('');
            }
        }
    };

    const handleFileListChange = (info) => {
        const { status, fileList } = info;
        if (status === 'done') {
            message.success(`Tệp ${info.file.name} được tải lên thành công.`);
            setFileError('');
        } else if (status === 'error') {
            message.error(`Tệp ${info.file.name} tải lên thất bại.`);
        }
        if (fileList.length > 0) {
            setFileList(fileList);
            setFileError('');
        } else {
            setFileError('Tệp phải được tải lên ít nhất 1');
        }
    };

    const handleImageListChange = (info) => {
        const { status, fileList } = info;
        if (status === 'done') {
            message.success(`Ảnh ${info.file.name} được tải lên thành công.`);
        } else if (status === 'error') {
            message.error(`Ảnh ${info.file.name} tải thất bại.`);
        }

        const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        const validFileList = fileList.filter((file) => acceptedImageTypes.includes(file.type));
        if (validFileList.length > 0) {
            setImageList(validFileList);
            setImageError('');
        } else {
            setImageList([]);
            setImageError('Hình ảnh phải có định dạng png hoặc jpeg/jpg');
        }
    };

    const handleVideoListChange = (info) => {
        const { status, fileList } = info;
        if (status === 'done') {
            message.success(`Video ${info.file.name} đã được tải lên thành công.`);
        } else if (status === 'error') {
            message.error(`Tải lên video ${info.file.name} thất bại.`);
        }

        const acceptedVideoTypes = ['video/mp4', 'video/quicktime'];
        const validFileList = fileList.filter((file) => acceptedVideoTypes.includes(file.type));
        if (validFileList.length > 0) {
            setVideoList(validFileList);
            setVideoError('');
        } else {
            setVideoList([]);
            setVideoError('Video phải có định dạng mp4 hoặc quicktime');
        }
    };

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
            formData.append('Files', file.originFileObj);
        }

        for (let i = 0; i < imageList.length; i++) {
            const file = imageList[i];
            formData.append('Images', file.originFileObj);
        }

        for (let i = 0; i < videoList.length; i++) {
            const file = videoList[i];
            formData.append('Videos', file.originFileObj);
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
                            value={
                                currentLog.trainingDate
                                    ? convertDateFormatToInput(currentLog.trainingDate)
                                    : trainingDateInput
                            }
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
                        <div>
                            <Upload
                                {...props}
                                defaultFileList={
                                    currentLog.files
                                        ? currentLog.files.map((file) => {
                                              return {
                                                  uid: file.id,
                                                  name: file.fileName,
                                              };
                                          })
                                        : fileList
                                }
                                onChange={handleFileListChange}
                            >
                                <Button icon={<UploadOutlined />}>Click để thêm</Button>
                            </Upload>
                        </div>
                    </div>
                    {fileError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={fileError} />
                        </div>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Ảnh</label>
                        <div>
                            <Upload
                                {...props}
                                defaultFileList={currentLog.images ? currentLog.images : imageList}
                                onChange={handleImageListChange}
                            >
                                <Button icon={<UploadOutlined />}>Click để thêm</Button>
                            </Upload>
                        </div>
                    </div>
                    {imageError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={imageError} />
                        </div>
                    )}
                    <div className={cx('input-group')}>
                        <label htmlFor="file">Video</label>
                        <div>
                            <Upload
                                {...props}
                                defaultFileList={currentLog.videos ? currentLog.videos : videoList}
                                onChange={handleVideoListChange}
                            >
                                <Button icon={<UploadOutlined />}>Click để thêm</Button>
                            </Upload>
                        </div>
                    </div>
                    {videoError && (
                        <div className={cx('error')}>
                            <ErrorMessage message={videoError} />
                        </div>
                    )}
                    <div className={cx('input-group', 'note')}>
                        <label htmlFor="note">Ghi chú</label>
                        <textarea
                            name="note"
                            value={currentLog.note ? currentLog.note : noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className={
                        trainingDateError || fileError || imageError || videoError
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
