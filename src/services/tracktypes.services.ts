import { api } from '../helpers/index';
import { TrackTypes } from '../store/TrackTypes/types';

const CreateTrackType = async (typename: string): Promise<any> => {
    return await api.post('/tracktypes/create', { typename })
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetListTrackType = async (): Promise<any> => {
    return await api.get('/tracktypes/list-type')
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const EditTrackType = async (model: TrackTypes): Promise<any> => {
    return await api.post(`/tracktypes/update/${model._id}`, model)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const DeleteTrackType = async (id: string): Promise<any> => {
    return await api.post(`/tracktypes/delete/${id}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetListOption = async (): Promise<any> => {
    return await api.get('/tracktypes/option')
        .then(response => {
            return response.data.items;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const trackTypesServices = {
    CreateTrackType,
    GetListTrackType,
    EditTrackType,
    DeleteTrackType,
    GetListOption
}