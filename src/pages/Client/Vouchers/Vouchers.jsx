import classNames from 'classnames/bind';
import styles from './Vouchers.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { getAllVouchersAsync } from '~/features/clientSlice';
import Spinner from '~/layouts/components/Spinner';
import { AiOutlineSearch } from 'react-icons/ai';
import useDebounce from '~/hooks/useDebounce';

const cx = classNames.bind(styles);

const Vouchers = () => {
    const { vouchers, loading } = useSelector((state) => state.client);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');
    const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        if (currentUser) {
            if (id !== currentUser.Id) {
                navigate(`/client/${currentUser.Id}/vouchers`);
            }
        }
    }, [id, currentUser, navigate]);

    useEffect(() => {
        dispatch(getAllVouchersAsync());
    }, [dispatch]);

    const filteredVouchers = vouchers.filter((voucher) =>
        voucher.discount.toLowerCase().includes(debounced.toLowerCase()),
    );

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-and-back')}>
                <Link to={`/client/${id}`} className={cx('back-link')}>
                    <IoIosArrowBack />
                    <span>Trang chủ</span>
                </Link>
                <h2 className={cx('header')}>Mã giảm giá</h2>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <div className={cx('content')}>
                    {vouchers && vouchers.length > 0 ? (
                        <>
                            <form className={cx('search')}>
                                <div className={cx('search-box')} type="submit">
                                    <AiOutlineSearch className={cx('search-icon')} />
                                    <input
                                        type="text"
                                        placeholder="Giảm giá (%)"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </form>
                            <div className={cx('voucher-list')}>
                                {filteredVouchers.map((voucher) => (
                                    <div className={cx('voucher-item')} key={voucher.id}>
                                        <div className={cx('logo')}>
                                            <img src={require('../../../assets/images/Logo.png')} alt="logo" />
                                        </div>
                                        <div className={cx('voucher-content')}>
                                            <h3 className={cx('discount')}>Giảm {voucher.discount}</h3>
                                            <h4 className={cx('code')}>Mã: {voucher.code}</h4>
                                            <p className={cx('description')}>{voucher.desc}</p>
                                            <span
                                                className={
                                                    voucher.isUsed ? cx('status', 'invalid') : cx('status', 'valid')
                                                }
                                            >
                                                {voucher.isUsed ? 'Đã sử dụng' : 'Hợp lệ'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={cx('voucher-empty')}>
                            <h3 className={cx('message')}>Hiện chưa có mã giảm giá nào!</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Vouchers;
