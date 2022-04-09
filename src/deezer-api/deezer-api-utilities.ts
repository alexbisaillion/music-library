import fetch, { Response } from 'node-fetch';
import { stringify } from 'querystring';
import { environment } from '../helpers/environment';
import { DeezerMethod } from './deezer-api-types';

type GenerateUrlParams = {
  accessToken: string;
  method: DeezerMethod;
  methodPaths?: string[] | number[];
  methodParams?: Record<string, string | number>;
};
export const generateUrl = (params: GenerateUrlParams): string => {
  const { accessToken, method, methodPaths, methodParams } = params;
  const fullPath = methodPaths && methodPaths.length > 0 ? `${method}/${methodPaths.join('/')}` : method;
  const fullParams: Record<string, string> = { output: 'json', access_token: accessToken, ...methodParams };
  return `https://api.deezer.com/${fullPath}?${stringify(fullParams)}`;
};

type MakeDeezerRequestParams = {
  method: DeezerMethod;
  methodPaths?: string[] | number[];
  methodParams?: Record<string, string | number>;
};
export const makeDeezerRequest = (params: MakeDeezerRequestParams): Promise<Response> => {
  const { method, methodPaths, methodParams } = params;
  const urlParams: GenerateUrlParams = {
    accessToken: environment.variables.DEEZER_ACCESS_TOKEN,
    method,
    methodPaths,
    methodParams
  };
  return fetch(generateUrl(urlParams), { method: 'GET' });
};
