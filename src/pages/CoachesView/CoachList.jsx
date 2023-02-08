import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CoachList.module.scss';

import CoachCard from '~/components/CoachCard';
const cx = classNames.bind(styles);

const Coaches = () => {
    const [isOnline, setIsOnline] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('coaches')}>
                    <div className={cx('title')}>
                        <h1>Huấn luyện viên</h1>
                        <span>Đội ngũ huấn luyện viên chất lượng, tận tình sẵn sàng phục vụ mọi người</span>
                    </div>
                    <div className={cx('search-bar')}>
                        <h3 className={cx('search-title')}>Tìm kiếm huấn luyện viên</h3>
                        <form id={cx('search-form')}>
                            <input type="text" name="name" id="name" placeholder="Tên Huấn luyện viên" />
                            <input type="text" name="experience" id="experience" placeholder="Số năm kinh nghiệm" />
                            <div className={cx('status')} onClick={() => setIsOnline(!isOnline)}>
                                <label>Trực tuyến</label>
                                <div className={cx('toggle-btn')}>
                                    <span className={isOnline ? cx('toggle-ball', 'online') : cx('toggle-ball')}></span>
                                </div>
                            </div>
                            <button type="submit" id={cx('search-btn')}>
                                Tìm kiếm
                            </button>
                        </form>
                    </div>
                    <div className={cx('coach-list')}>
                        <CoachCard />
                        <CoachCard />
                        <CoachCard />
                        <CoachCard />
                        <CoachCard />
                        <CoachCard />
                        <CoachCard />
                        <CoachCard />
                        {/* <div className={cx('coach-item')}>
                                <div className={cx('status')}>
                                    <div className={cx('icon')}></div>
                                    <span className={cx('status-title')}>Trực tuyến</span>
                                </div>
                                <div className={cx('avatar')}>
                                    <FaUserCircle className={cx('icon')} />
                                </div>
                                <h3 className={cx('name')}>Huy Tran Nhat</h3>
                                <span className={cx('experience')}>5 năm kinh nghiệm</span>
                                <button id={cx('view-btn')}>Xem thông tin</button>
                            </div> */}
                    </div>
                    <button id={cx('view-all-btn')}>Xem thêm</button>
                </div>
            </div>
        </div>
    );
};

export default Coaches;
