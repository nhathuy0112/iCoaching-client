import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContractLogsAsync, getProgramFileDownloadAsync } from '~/features/contractSlice';
import styles from './Progress.module.scss';
import { handleRenderFileIcon } from '~/utils/file';
import Modal from '~/components/Modal';
import Spinner from '~/components/Spinner';

const cx = classNames.bind(styles);

const Progress = () => {
    const dispatch = useDispatch();
    const { logs, loading } = useSelector((state) => state.contract);
    const { contractId } = useParams();
    const [expandedItems, setExpandedItems] = useState([]);

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');

    useEffect(() => {
        dispatch(getContractLogsAsync(contractId));
    }, [dispatch, contractId]);

    const handleToggleShowItem = (log) => {
        const index = expandedItems.indexOf(log.id);
        if (index > -1) {
            // If item expand, show less
            setExpandedItems(expandedItems.filter((id) => id !== log.id));
        } else {
            // If item is not expanded, show more
            setExpandedItems([...expandedItems, log.id]);
        }
    };

    const isItemExpanded = (log) => {
        return expandedItems.includes(log.id);
    };

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

    const handleOpenImage = (e) => {
        setOpen(true);
        setFile(e);
    };

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('day-list')}>
                    {logs &&
                        logs.map((log) => (
                            <div className={cx('day-item')} key={log.id}>
                                <div className={cx('day-number')}>
                                    <div className={cx('number')}>
                                        <h3 className={cx('title')}>Ngày {log.dateNo}</h3>
                                        {log.status === 'Complete' && (
                                            <span className={cx('completed')}>
                                                <AiFillCheckCircle />
                                            </span>
                                        )}
                                    </div>
                                    <div className={cx('action')}>
                                        {isItemExpanded(log) ? (
                                            <div className={cx('show-less')} onClick={() => handleToggleShowItem(log)}>
                                                <MdOutlineKeyboardArrowUp />
                                            </div>
                                        ) : (
                                            <div className={cx('show-more')} onClick={() => handleToggleShowItem(log)}>
                                                <MdOutlineKeyboardArrowDown />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {isItemExpanded(log) && (
                                    <div className={cx('day-content')}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Ngày tập luyện</th>
                                                    <td>{log.trainingDate ? log.trainingDate : 'Chưa cập nhật'}</td>
                                                </tr>
                                                <tr>
                                                    <th>Lần cập nhật cuối</th>
                                                    <td>
                                                        {log.lastUpdatingDate ? log.lastUpdatingDate : 'Chưa cập nhật'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Tệp đính kèm</th>
                                                    <td>
                                                        {log.files.length > 0
                                                            ? log.files.map((file) => (
                                                                  <p
                                                                      key={file.id}
                                                                      className={cx('file')}
                                                                      onClick={() => handleDownloadFile(file)}
                                                                  >
                                                                      <span className={cx('file-icon')}>
                                                                          {handleRenderFileIcon(file.fileName)}
                                                                      </span>
                                                                      <span className={cx('file-name')}>
                                                                          {file.fileName}
                                                                      </span>
                                                                  </p>
                                                              ))
                                                            : 'Chưa cập nhật'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Ảnh</th>
                                                    <td className={cx('image-list')}>
                                                        {log.images.length > 0
                                                            ? log.images.map((image) => (
                                                                  <div className={cx('image-frame')} key={image.id}>
                                                                      <img
                                                                          src={image.url}
                                                                          alt="person"
                                                                          onClick={() => handleOpenImage(image.url)}
                                                                      />
                                                                  </div>
                                                              ))
                                                            : 'Chưa cập nhật'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Video</th>
                                                    <td className={cx('video-list')}>
                                                        {log.videos.length > 0
                                                            ? log.videos.map((video) => (
                                                                  <div className={cx('video-frame')} key={video.id}>
                                                                      <video controls>
                                                                          <source src={video.url} />
                                                                      </video>
                                                                  </div>
                                                              ))
                                                            : 'Chưa cập nhật'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Ghi chú</th>
                                                    <td>{log.note ? log.note : 'Chưa cập nhật'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            )}
            {open && (
                <div className={cx('modal')}>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        modalStyle={{ background: 'none' }}
                        closeBtnStyle={{ display: 'none' }}
                    >
                        <button className={cx('closeBtn')} onClick={() => setOpen(false)}>
                            <AiOutlineClose />
                        </button>
                        <img id={cx('photo')} src={file} alt="expand" />
                    </Modal>
                </div>
            )}
        </div>
    );
};

export default Progress;
