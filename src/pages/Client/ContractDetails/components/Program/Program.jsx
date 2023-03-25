import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractProgramFilesAsync, getProgramFileDownloadAsync } from '~/features/contractSlice';
import { handleRenderFileIcon } from '~/utils/file';
import styles from './Program.module.scss';

const cx = classNames.bind(styles);

const Program = () => {
    const dispatch = useDispatch();
    const { programFiles, downloadLink } = useSelector((state) => state.contract);
    const { contractId } = useParams();

    useEffect(() => {
        dispatch(getContractProgramFilesAsync(contractId));
    }, [dispatch, contractId]);

    const handleDownloadFile = (file) => {
        dispatch(getProgramFileDownloadAsync({ contractId: contractId, fileId: file.id }))
            .unwrap()
            .then(() => {
                const url = window.URL.createObjectURL(new Blob([downloadLink]));
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
                    {programFiles.map((file) => (
                        <div className={cx('file-item')} key={file.id}>
                            <span className={cx('file-icon')}>{handleRenderFileIcon(file.fileName)}</span>
                            <span>{file.fileName}</span>
                            <button onClick={() => handleDownloadFile(file)}>Tải xuống</button>
                        </div>
                    ))}
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
