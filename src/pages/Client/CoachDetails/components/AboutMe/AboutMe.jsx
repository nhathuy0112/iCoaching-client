import { useEffect } from 'react';
import styles from './AboutMe.module.scss';
import classNames from 'classnames/bind';

import { getCoachAboutAsync } from '~/features/guestSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '~/layouts/components/Spinner';

const cx = classNames.bind(styles);

const AboutMe = () => {
    const { about, currentCoach, loading } = useSelector((state) => state.guest);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCoachAboutAsync(currentCoach.id));
    }, [dispatch, currentCoach]);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('content')}>
                    {about ? (
                        <div dangerouslySetInnerHTML={{ __html: about }}></div>
                    ) : (
                        <div className={cx('empty')}>
                            <h3 className={cx('message')}>Huấn luyện viên này chưa cập nhật giới thiệu bản thân</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AboutMe;
