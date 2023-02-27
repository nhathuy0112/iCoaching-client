import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { usePagination, DOTS } from '~/hooks/usePagination';

const cx = classNames.bind(styles);

const Pagination = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });
    // console.log(paginationRange);
    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={cx('pagination-container', { [className]: className })}>
            <li
                className={cx('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <AiOutlineLeft className={cx('prev-btn')} />
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return (
                        <li className={cx('pagination-item dots')}>
                            <span>&#8230;</span>
                        </li>
                    );
                }

                return (
                    <li
                        className={cx('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(pageNumber)}
                        key={pageNumber}
                    >
                        <span
                            className={cx('pagination-btn', {
                                actived: pageNumber === currentPage,
                            })}
                        >
                            {pageNumber}
                        </span>
                    </li>
                );
            })}
            <li
                className={cx('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <AiOutlineRight className={cx('next-btn')} />
            </li>
        </ul>
    );
};

export default Pagination;
