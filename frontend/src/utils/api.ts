// libraries
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// interfaces
import { ApiParams } from "../../interfaces/api"

const { REACT_APP_API_URL = "https://prodapi.test" } = process.env;

export async function apiWrapper(params: ApiParams) {
    try {
        const request: AxiosRequestConfig<any> = {
            method: params.method,
        };
        if (params.headers) {
            request.headers = params.headers;
        }
        if (params.body) {
            request.data = params.body;
        }
        // for fast dev purpose we'll test locally
        const response = await axios(`localhost:3000/${params.path}`, request);
        //const response = await axios(`${REACT_APP_API_URL}${params.path}`, request);
        return response;
    } catch (error) {
        return (error as { response: AxiosResponse }).response;
    }
}
