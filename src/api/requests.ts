import axios from 'axios';
import { BarRequest, BarResponse } from './types';

const API_BASE_URL = 'http://localhost:5002';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export async function getBars(data: BarRequest): Promise<BarResponse> {
  const response = await instance.request({
    url: '/history',
    method: 'POST',
    data,
  });
  return response.data;
}
