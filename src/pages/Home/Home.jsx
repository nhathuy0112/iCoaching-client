import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { AiOutlineSchedule } from 'react-icons/ai';
import { CgGym } from 'react-icons/cg';
import { BiTimeFive } from 'react-icons/bi';
// import { FaUserCircle } from 'react-icons/fa';
import ServiceCard from '~/components/ServiceCard';
import CoachCard from '~/components/CoachCard';

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('banner-content')}>
                    <div className={cx('slogan-and-train')}>
                        <h1 className={cx('main-slogan')}>
                            <span style={{ color: 'var(--primary-color)' }}>Sức khỏe</span> <br /> là lựa chọn, không
                            phải điều bí ẩn của sự ngẫu nhiên
                        </h1>
                        <h5 className={cx('sub-slogan')}>
                            Sức khỏe không phải là thứ chúng ta có thể mua. Tuy nhiên, nó có thể là một tài khoản tiết
                            kiệm cực kỳ giá trị.
                        </h5>
                        <button className={cx('train-btn')}>tập luyện ngay</button>
                    </div>
                    <div className={cx('services')}>
                        <div className={cx('service-list')}>
                            <div className={cx('service-item')}>
                                <div className={cx('service-icon')}>
                                    <AiOutlineSchedule />
                                </div>
                                <div className={cx('service-content')}>
                                    <span className={cx('description')}>Thời gian biểu khoa học</span>
                                    <span className={cx('sub-description')}>Dinh dưỡng & luyện tập </span>
                                </div>
                            </div>
                            <li className={cx('service-item')}>
                                <div className={cx('service-icon')}>
                                    <CgGym />
                                </div>
                                <div className={cx('service-content')}>
                                    <span className={cx('description')}>Huấn luyện</span>
                                    <span className={cx('sub-description')}>Đăng ký trực tuyến</span>
                                </div>
                            </li>
                        </div>
                    </div>
                </div>

                <div className={cx('service')}>
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
                        <h1>Huấn luyện viên</h1>
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
                    <a href="./coaches">
                        <button id={cx('view-all-btn')}>Xem tất cả</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
