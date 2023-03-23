import classNames from 'classnames/bind';
import styles from './AddResource.module.scss';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { uploadContractProgramFilesAsync } from '~/features/contractSlice';
import { useState } from 'react';
const { Dragger } = Upload;

const cx = classNames.bind(styles);

const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        console.log(status);
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const AddResource = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, contractId } = useParams();
    const [fileList, setFileList] = useState([]);

    const handleFileListChange = (info) => {
        const { status, fileList } = info;
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        setFileList(fileList);
    };

    const handleUploadProgramFiles = () => {
        if (fileList.length > 0) {
            const formData = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                formData.append('files', file.originFileObj);
            }
            dispatch(uploadContractProgramFilesAsync({ contractId: contractId, payload: formData }))
                .unwrap()
                .then(() => {
                    navigate(`/coach/${id}/my-clients/view-details/${contractId}`, {
                        state: { isAddedResources: true },
                    });
                });
        } else {
            message.error('Vui lòng tải lên ít nhất một file.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <div
                    onClick={() => {
                        navigate(`/coach/${id}/my-clients/view-details/${contractId}`, {
                            state: { isAddedResources: true },
                        });
                    }}
                    className={cx('back-link')}
                >
                    <IoIosArrowBack />
                    <span>Quay lại</span>
                </div>
                <h2 className={cx('title')}>Thêm tài nguyên</h2>
            </div>
            <div className={cx('content')}>
                <Dragger {...props} fileList={fileList} onChange={handleFileListChange}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click hoặc kéo thả tệp vào đây để tải lên</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
            </div>
            <button id={cx('save-btn')} onClick={handleUploadProgramFiles}>
                Lưu
            </button>
        </div>
    );
};
export default AddResource;
