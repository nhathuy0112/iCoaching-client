import classNames from 'classnames/bind';
import { useMemo, useState } from 'react';
import Pagination from '~/components/Pagination';
import styles from './Photos.module.scss';

const cx = classNames.bind(styles);

const Photos = () => {
    const renderPhotos = () => {
        const photos = [];
        for (let i = 1; i <= 35; i++) {
            const photo = {
                id: i,
                url: '~/assets/images/coach-photo1.png',
            };
            photos.push(photo);
        }
        return photos;
    };

    const photos = renderPhotos();

    //Pagination
    let pageSize = 28;
    const [currentPage, setCurrentPage] = useState(1);

    const currentPhotosPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return photos.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, pageSize, photos]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('photo-list')}>
                {currentPhotosPagination.map((photo) => (
                    <div className={cx('photo-item')} key={photo.id}>
                        <img src={require('~/assets/images/coach-photo1.png')} alt={'coach'} className={cx('image')} />
                    </div>
                ))}
            </div>
            <Pagination
                className={cx('pagination-bar')}
                currentPage={currentPage}
                totalCount={photos.length}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default Photos;
