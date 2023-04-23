import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractProgramFilesAsync, getProgramFileDownloadAsync } from '~/features/contractSlice';
import Spinner from '~/components/Spinner';
import { handleRenderFileIcon } from '~/utils/file';
import styles from './Program.module.scss';

const cx = classNames.bind(styles);

const Program = () => {
    const dispatch = useDispatch();
    const { programFiles } = useSelector((state) => state.contract);
    const { contractId } = useParams();
    const [loading, setLoading] = useState({ isLoading: false, fileId: null });

    useEffect(() => {
        dispatch(getContractProgramFilesAsync(contractId));
    }, [dispatch, contractId]);

    const handleDownloadFile = (file) => {
        setLoading({ isLoading: true, fileId: file });
        dispatch(getProgramFileDownloadAsync({ contractId: contractId, fileId: file.id, responseType: 'blob' }))
            .unwrap()
            .then((response) => {
                setLoading({ isLoading: false });
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.fileName);
                document.body.appendChild(link);
                link.click();
            });
    };

    return (
        <div className={cx('wrapper')}>
            {programFiles && programFiles.length > 0 ? (
                <div className={cx('file-list')}>
                    <table id={cx('file-table')}>
                        <tr>
                            <th>Tệp</th>
                            <th>Ngày cập nhật</th>
                            <th>Kích thước</th>
                            <th></th>
                        </tr>
                        {programFiles.map((file) => (
                            <tr key={file.id}>
                                <td>
                                    <span className={cx('file-icon')}>{handleRenderFileIcon(file.fileName)}</span>
                                    <span>{file.fileName}</span>
                                </td>
                                <td>{file.date}</td>
                                <td>{file.size}</td>
                                <td>
                                    <div className={cx('action-btn')}>
                                        <button
                                            id={cx('download-btn')}
                                            onClick={() => handleDownloadFile(file)}
                                            disabled={loading.isLoading}
                                        >
                                            {loading.isLoading && loading.fileId === file ? (
                                                <Spinner />
                                            ) : (
                                                <AiOutlineDownload />
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            ) : (
                <div className={cx('file-empty')}>
                    <h2>Chương trình tập luyện chưa được cập nhật!</h2>
                    <span>Vui lòng đợi Huấn luyện viên cập nhật!</span>
                </div>
            )}
        </div>
    );
};

export default Program;
