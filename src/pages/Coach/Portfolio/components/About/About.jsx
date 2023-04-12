import classNames from 'classnames/bind';
import styles from './About.module.scss';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutMeAsync } from '~/features/coachSlice';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const About = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { aboutMe } = useSelector((state) => state.coach);

    useEffect(() => {
        dispatch(getAboutMeAsync());
    }, [dispatch]);

    return (
        <div className={cx('wrapper')}>
            {aboutMe ? (
                <div className={cx('content')}>
                    <div dangerouslySetInnerHTML={{ __html: aboutMe }}></div>
                    <button id={cx('update-btn')} onClick={() => navigate('update-about')}>
                        <span>Cập nhật</span>
                    </button>
                </div>
            ) : (
                <div className={cx('about-empty')}>
                    <h2>Bạn chưa cập nhật Giới thiệu bản thân!</h2>
                    <Link className={cx('update-link')} to="update-about">
                        Cập nhật tại đây!
                    </Link>
                </div>
            )}
        </div>
    );
};

export default About;
