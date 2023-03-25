export const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
};

export const convertDateFormatToInput = (dateString) => {
    const dateParts = dateString.split('/');
    const month = dateParts[0].length === 1 ? '0' + dateParts[0] : dateParts[0];
    const day = dateParts[1].length === 1 ? '0' + dateParts[1] : dateParts[1];
    const year = dateParts[2];
    return year + '-' + month + '-' + day;
};
