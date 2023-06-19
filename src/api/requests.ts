import axios from 'axios';
import {
  BarRequest,
  BarResponse,
  EquityDetailsResponse,
  EquityNewsResponse,
  MoversResponse,
  TickerDetailsRequest,
  TickerDetailsResponse,
  TickerSearchRequest,
  TickerSearchResponse,
} from './types';
import { BasicPriceInfo } from '../models/basic-price-info';
import { EquityKeyStats } from '../models/equity-key-stats';
import { EquityEarningsInfo } from '../models/equity-earnings-info';

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

export async function getTickers(data: TickerSearchRequest): Promise<TickerSearchResponse> {
  const response = await instance.request({
    url: '/search',
    method: 'POST',
    data,
  });
  return response.data;
}

export async function getMovers(): Promise<MoversResponse> {
  const response = await instance.request({
    url: '/movers',
    method: 'GET',
    timeout: 5000,
  });
  return response.data;
}

export async function getTickerDetails(data: TickerDetailsRequest): Promise<TickerDetailsResponse> {
  const response = await instance.request({
    url: '/details',
    method: 'POST',
    data,
    timeout: 10000,
  });
  return response.data;
}

export async function getEquityDetails(data: TickerSearchRequest): Promise<EquityDetailsResponse> {
  const response = await instance.request({
    url: '/equity-details',
    method: 'POST',
    data,
  });
  if (response.data.length > 0)
    return response.data[0];
  return null;
}

export async function getEquityNews(data: TickerSearchRequest): Promise<EquityNewsResponse> {
  const response = await instance.request({
    url: '/equity-news',
    method: 'POST',
    data,
  });
  return response.data;
}

export async function getBasicPriceInfo(data: TickerSearchRequest): Promise<BasicPriceInfo> {
  const response = await instance.request({
    url: '/basic-price-info',
    method: 'POST',
    data,
  });
  return response.data;
}

export async function getEquityKeyStats(data: TickerSearchRequest): Promise<EquityKeyStats> {
  const response = await instance.request({
    url: '/equity-key-stats',
    method: 'POST',
    data,
  });
  return response.data;
}
export async function getEquityEarningsInfo(data: TickerSearchRequest): Promise<EquityEarningsInfo> {
  const response = await instance.request({
    url: '/equity-earnings-info',
    method: 'POST',
    data,
  });
  return response.data;
}
