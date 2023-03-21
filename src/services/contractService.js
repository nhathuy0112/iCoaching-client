import axios from '~/api/axios';

const END_POINTS = {
    CONTRACT: '/Contract',
};

export const getContractDetails = (contractId) => axios.get(`${END_POINTS.CONTRACT}/${contractId}/detail`);
