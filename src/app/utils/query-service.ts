import axios from 'axios';
import { UserDto } from '../dtos/user-dto';

export const MainApiBaseRoute = "https://peticiones.online/api"

export const EndpointUrl = {
    users: {
        getAll: () => `${MainApiBaseRoute}/users`,
        getById: (id: string) => `${MainApiBaseRoute}/users/${id}`,
        create: () => `${MainApiBaseRoute}/users`,
        update: (id: string) => `${MainApiBaseRoute}/users/${id}`,
        delete: (id: string) => `${MainApiBaseRoute}/users/${id}`,
    }
}

export const AxiosEndpoint = {
    users: {
        getAll: async (): Promise<Array<any>> => {
            let response = await axios.get(EndpointUrl.users.getAll());
            return response.data;
        },
        getById: async (id: string): Promise<Array<any>> => {
            let response = await axios.get(EndpointUrl.users.getById(id));
            return response.data;
        },
        create: async (user: UserDto) => {
            const requestBody = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                username: user.username,
                password: user.Password
            };
            let response = await axios.post(EndpointUrl.users.create(), requestBody);
            return response.data;
        },
        update:async (obj: UserDto): Promise<Array<any>> => {
            let response = await axios.put(EndpointUrl.users.update(obj._id), obj);
            return response.data;
        },
        delete:async (id: string) => {
            let response = await axios.delete(EndpointUrl.users.delete(id));
            return response.data;
        }
    }
}