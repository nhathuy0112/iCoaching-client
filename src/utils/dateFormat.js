export const convertDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
};

export const convertDateFormatToInput = (dateString) => {
    if (!dateString) {
        return '';
    }
    const dateParts = dateString.split('/');
    const formattedDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
    return formattedDate;
};
