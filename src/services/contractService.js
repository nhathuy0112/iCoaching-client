import axios from '~/api/axios';

const END_POINTS = {
    CONTRACT: '/Contract',
};

export const getContractDetails = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/detail`);

export const getContractProgramFiles = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/files`);

export const getProgramFileDownload = ({ contractId, fileId }) =>
    axios.get(`${END_POINTS.CONTRACT}/${contractId}/file/downloading/${fileId}`);

export const getContractLogs = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/logs`);
