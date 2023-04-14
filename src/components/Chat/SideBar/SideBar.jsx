import styles from '../Chat.module.scss';
import classNames from 'classnames/bind';
import Search from '../Search';
import Chats from '../Chats';
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const SideBar = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className={cx('sidebar', { sidebarCoach: currentUser?.role === 'COACH' })}>
            {/* {currentUser?.role !== 'COACH' && <Navbar />} */}
            {/* <Search /> */}
            <Chats />
        </div>
    );
};

export default SideBar;
