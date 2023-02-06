import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('about')}>
                    <h3>Về chúng tôi</h3>
                    <p>Liên hệ</p>
                    <p>Hỏi đáp</p>
                </div>
                <div className={cx('service')}>
                    <h3>Dịch vụ</h3>
                    <p>Tư vấn online</p>
                    <p>Huấn luyện online</p>
                    <p>Trao đổi với huấn luyện viên</p>
                </div>
                <div className={cx('follow')}>
                    <h3>Theo dõi chúng tôi</h3>
                    <ul>
                        <li>
                            <img src={require('~/assets/images/Facebook.png')} alt="fb" />
                        </li>
                        <li>
                            <img src={require('~/assets/images/Instagram.png')} alt="ins" />
                        </li>
                        <li>
                            <img src={require('~/assets/images/YouTube.png')} alt="ytb" />
                        </li>
                        <li>
                            <img src={require('~/assets/images/LinkedIn.png')} alt="lkd" />
                        </li>
                    </ul>
                </div>
                <div className={cx('copy-right')}>
                    <h3>iCoaching</h3>
                    <p>Phát triển bởi iCoaching Team</p>
                    <p>Bản quyền @2023</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
