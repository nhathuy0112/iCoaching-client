import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { BiTimeFive } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import ServiceCard from '~/components/ServiceCard';
import CoachCard from '~/components/CoachCard';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Home = () => {
    const services = [
        {
            id: 1,
            icon: <BiTimeFive />,
            content: 'Bài tập khoa học',
        },
        {
            id: 2,
            icon: <BiTimeFive />,
            content: 'Huấn luyện trực tuyến',
            isMain: true,
        },
        {
            id: 3,
            icon: <BiTimeFive />,
            content: 'Giảm cân cấp tốc',
        },
        {
            id: 4,
            icon: <BiTimeFive />,
            content: 'Tư vấn dinh dưỡng',
        },
    ];

    const [isOnline, setIsOnline] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('service')}>
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
                    <div className={cx('title')}>
                        <h1>dịch vụ</h1>
                        <span>Chúng tôi sẵn lòng mang đến những dịch vụ tốt nhất</span>
                    </div>
                    <div className={cx('service-list')}>
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
                <div className={cx('coaches')}>
                    <div className={cx('title')}>
                        <h1>huấn luyện viên</h1>
                        <span>Đội ngũ huấn luyện viên chất lượng, tận tình sẵn sàng phục vụ mọi người</span>
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
                </div>
            </div>
        </div>
    );
};

export default Home;
