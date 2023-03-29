import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
    deleteContractProgramFileAsync,
    getContractProgramFilesAsync,
    getProgramFileDownloadAsync,
} from '~/features/contractSlice';
import { handleRenderFileIcon } from '~/utils/file';
import styles from './Program.module.scss';
import Modal from '~/components/Modal';
import { AiOutlineDelete, AiOutlineDownload } from 'react-icons/ai';

const cx = classNames.bind(styles);

const Program = () => {
    const dispatch = useDispatch();
    const { programFiles, currentContract } = useSelector((state) => state.contract);
    const { id, contractId } = useParams();
    const [isOpenDeteleModal, setIsOpenDeteleModal] = useState(false);
    const [selectedFile, setSeletectedFile] = useState({});

    useEffect(() => {
        dispatch(getContractProgramFilesAsync(contractId));
    }, [dispatch, contractId]);

    const handleDownloadFile = (file) => {
        dispatch(getProgramFileDownloadAsync({ contractId: contractId, fileId: file.id, responseType: 'blob' }))
            .unwrap()
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.fileName);
                document.body.appendChild(link);
                link.click();
            });
    };

    const handleOpenDeleteModal = (file) => {
        setIsOpenDeteleModal(true);
        setSeletectedFile(file);
    };

    const handleDeleteFile = () => {
        dispatch(deleteContractProgramFileAsync({ contractId: contractId, fileId: selectedFile.id }))
            .unwrap()
            .then(() => {
                setIsOpenDeteleModal(false);
                dispatch(getContractProgramFilesAsync(contractId));
            });
    };

    return (
        <div className={cx('wrapper')}>
            {programFiles && programFiles.length > 0 ? (
                <>
                    {currentContract?.status === 'Active' && (
                        <div className={cx('action')}>
                            <div className={cx('add')}>
                                <Link
                                    className={cx('add-link')}
                                    to={`/coach/${id}/my-clients/view-details/${contractId}/add-resource`}
                                >
                                    Thêm tài nguyên
                                </Link>
                            </div>
                            <div className={cx('filter-and-search')}>
                                <input type="text" placeholder="Tìm kiếm" />
                            </div>
                        </div>
                    )}
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
                                            <button id={cx('download-btn')} onClick={() => handleDownloadFile(file)}>
                                                <AiOutlineDownload />
                                            </button>
                                            <button id={cx('delete-btn')} onClick={() => handleOpenDeleteModal(file)}>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </>
            ) : (
                <div className={cx('file-empty')}>
                    <h2>Chương trình tập luyện đang trống!</h2>
                    <Link
                        className={cx('add-link')}
                        to={`/coach/${id}/my-clients/view-details/${contractId}/add-resource`}
                    >
                        Thêm tài nguyên
                    </Link>
                </div>
            )}
            {isOpenDeteleModal && (
                <Modal
                    open={isOpenDeteleModal}
                    onClose={() => setIsOpenDeteleModal(false)}
                    modalStyle={{}}
                    closeBtnStyle={{ display: 'none' }}
                >
                    <div className={cx('header')}>
                        <h1>iCoaching</h1>
                    </div>
                    <div className={cx('body')}>
                        <h2 className={cx('title')}>
                            Bạn đồng ý xóa tệp <span style={{ color: '#1A97CC' }}>{selectedFile.fileName}</span>?
                        </h2>
                        <div className={cx('modal-action')}>
                            <button id={cx('agree-btn')} type="submit" onClick={handleDeleteFile}>
                                <BsCheckLg />
                                <span>Đồng ý</span>
                            </button>
                            <button id={cx('cancel-btn')} onClick={() => setIsOpenDeteleModal(false)}>
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

export default Program;
