import { api } from '../helpers/index';

const CreateTrackType = async (typename: string): Promise<any> => {
    return await api.post('/tracktypes/create', { typename })
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const trackTypesServices = {
    CreateTrackType
}