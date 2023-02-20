import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);
const About = () => (
    <div className={cx('wrapper')}>
        <p className={cx('paragraph')}>
            Lorem ipsum dolor sit amet, consectetur adipiscing.Lorem ipsum dolor sit amet, consectetur adipiscing .Lorem
            ipsum dolor sit amet, consectetur adipiscing .Lorem ipsum dolor sit amet, consectetur adipiscing .Lorem
            ipsum dolor sit amet, consectetur adipiscing .Lorem ipsum dolor sit amet, consectetur adipiscing .Lorem
            ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum
            dolor sit amet, consectetur adipiscing .Lorem ipsum dolor sit amet, consectetur adipiscing .Lorem ipsum
            dolor sit amet, consectetur adipiscing .Lorem ipsum dolor sit amet, consectetur adipiscing
        </p>
    </div>
);

export default About;
