import classNames from 'classnames/bind';
import styles from './AddResource.module.scss';

import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { handleRenderFileIcon } from '~/utils/file';
import { uploadContractProgramFilesAsync } from '~/features/contractSlice';
import Spinner from '~/layouts/components/Spinner';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const AddResource = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id, contractId } = useParams();
    const [fileList, setFileList] = useState([]);
    const { loading } = useSelector((state) => state.contract);

    const handleFileListChange = (event) => {
        const file = event.target.files[0];
        file.id = Date.now();
        setFileList([...fileList, file]);
    };

    const handleDeleteFile = (fileId) => {
        const newFileList = fileList.filter((file) => file.id !== fileId);
        setFileList(newFileList);
    };

    const handleUploadProgramFiles = () => {
        const formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            formData.append('files', file);
        }
        dispatch(uploadContractProgramFilesAsync({ contractId: contractId, payload: formData }))
            .unwrap()
            .then(() => {
                navigate(`/coach/${id}/my-clients/view-details/${contractId}`, {
                    state: { isAddedResources: true },
                });
                toast.success('Thêm tài nguyên thành công!');
            });
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
                <div className={cx('file-card')}>
                    <div className={cx('file-inputs')}>
                        <input type="file" onChange={handleFileListChange} />
                        <button>
                            <i>
                                <FaPlus />
                            </i>
                            Click để thêm
                        </button>
                    </div>
                </div>
                <ul className={cx('file-list')}>
                    {fileList.map((file) => (
                        <li className={cx('file-item')} key={file.id}>
                            <span>{handleRenderFileIcon(file.name)}</span>
                            <p>{file.name}</p>
                            <div className={cx('action')} onClick={() => handleDeleteFile(file.id)}>
                                <div className={cx('loading')}></div>
                                <FaTrashAlt />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {fileList && fileList.length > 0 && (
                <button id={cx('save-btn')} onClick={handleUploadProgramFiles} disabled={loading}>
                    {loading ? <Spinner /> : <span>Lưu</span>}
                </button>
            )}
        </div>
    );
};
export default AddResource;
