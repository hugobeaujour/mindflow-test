export interface ApiParams {
    method: string
    credentials?: boolean;
    body?: any;
    auth?: boolean;
    headers?: { [key: string]: string };
    formData?: boolean;
    path: string;
}
