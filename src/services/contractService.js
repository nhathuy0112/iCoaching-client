import axios from '~/api/axios';

const END_POINTS = {
    CONTRACT: '/Contract',
};

export const getContractDetails = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/detail`);

export const uploadContractProgramFiles = ({ contractId, payload }) =>
    axios.post(`${END_POINTS.CONTRACT}/${contractId}/file`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const getContractProgramFiles = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/files`);

export const deleteContractProgramFile = ({ contractId, fileId }) =>
    axios.delete(`${END_POINTS.CONTRACT}/${contractId}/file/${fileId}`);

export const getProgramFileDownload = ({ contractId, fileId, responseType }) =>
    axios.get(`${END_POINTS.CONTRACT}/${contractId}/file/downloading/${fileId}`, { responseType });

export const updateContractLog = ({ contractId, logId, payload }) =>
    axios.put(`${END_POINTS.CONTRACT}/${contractId}/log/${logId}`, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const getContractLogs = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/logs`);

export const getContractLogDetails = ({ contractId, logId }) =>
    axios.get(`${END_POINTS.CONTRACT}/${contractId}/log/${logId}`);

export const sendReport = ({ contractId, data }) =>
    axios.post(`${END_POINTS.CONTRACT}/${contractId}/report`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })

export const getContractReports = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/reports`);