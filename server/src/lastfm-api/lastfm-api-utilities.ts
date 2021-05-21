import { createHash } from 'crypto';
import { stringify } from 'querystring';
import fetch, { Response } from 'node-fetch';
import { environment } from '../helpers/environment';
import { LastfmMethod } from './lastfm-api-types';

export const generateMethodSignature = (sharedSecret: string, methodParams: Record<string, string>): string => {
  const signature =
    Object.keys(methodParams)
      .sort()
      .reduce((acc, key) => acc + key + methodParams[key], '') + sharedSecret;
  return createHash('md5').update(signature, 'utf8').digest('hex');
};

type GenerateUrlParams = {
  apiKey: string;
  method: LastfmMethod;
  methodParams: Record<string, string | number>;
};
export const generateUrl = (params: GenerateUrlParams): string => {
  const { apiKey, method, methodParams } = params;
  const fullParams: Record<string, string> = { ...methodParams, api_key: apiKey, method: method };
  return `http://ws.audioscrobbler.com/2.0/?format=json&${stringify(fullParams)}`;
};

type GenerateAuthenticatedUrlParams = {
  apiKey: string;
  sharedSecret: string;
  session: string;
  method: LastfmMethod;
  methodParams: Record<string, string | number>;
};
export const generateAuthenticatedUrl = (params: GenerateAuthenticatedUrlParams): string => {
  const { apiKey, sharedSecret, session, method, methodParams } = params;
  const fullParams: Record<string, string> = { ...methodParams, api_key: apiKey, sk: session, method: method };
  return `http://ws.audioscrobbler.com/2.0/?format=json&${stringify(fullParams)}&api_sig=${generateMethodSignature(
    sharedSecret,
    fullParams
  )}`;
};

export const makeLastfmAuthenticatedRequest = (
  method: LastfmMethod,
  methodParams: Record<string, string | number>,
  externalUser?: string
): Promise<Response> => {
  const urlParams: GenerateAuthenticatedUrlParams = {
    apiKey: environment.variables.LASTFM_API_KEY,
    session: externalUser ? '' : environment.variables.LASTFM_SESSION, // TODO: Add retrieval of user session.
    sharedSecret: environment.variables.LASTFM_SHARED_SECRET,
    method,
    methodParams: { ...methodParams, user: externalUser || environment.variables.LASTFM_USERNAME }
  };
  return fetch(generateAuthenticatedUrl(urlParams), { method: 'POST' });
};

export const makeLastfmRequest = (
  method: LastfmMethod,
  methodParams: Record<string, string | number>,
  externalUser?: string
): Promise<Response> => {
  const urlParams: GenerateUrlParams = {
    apiKey: environment.variables.LASTFM_API_KEY,
    method,
    methodParams: { ...methodParams, user: externalUser || environment.variables.LASTFM_USERNAME }
  };
  return fetch(generateUrl(urlParams), { method: 'GET' });
};
