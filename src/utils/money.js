export const formatMoney = (price) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });

    const formattedPrice = formatter.format(price);
    return formattedPrice.replace('₫', 'VNĐ');
}