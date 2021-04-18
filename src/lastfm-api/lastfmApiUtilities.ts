import { createHash } from 'crypto';
import { stringify } from 'querystring';
import fetch, { Response } from 'node-fetch';
import { EnvironmentVariable, getEnvVar } from '../helpers/environmentVariables';
import { LastfmMethod } from './lastfmApiTypes';

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

export const makeAuthenticatedRequest = (
  method: LastfmMethod,
  methodParams: Record<string, string | number>,
  externalUser?: string
): Promise<Response> => {
  const urlParams: GenerateAuthenticatedUrlParams = {
    apiKey: getEnvVar(EnvironmentVariable.LastfmApiKey),
    session: externalUser ? '' : getEnvVar(EnvironmentVariable.LastfmSession), // TODO: Add retrieval of user session.
    sharedSecret: getEnvVar(EnvironmentVariable.LastfmSharedSecret),
    method,
    methodParams: { ...methodParams, user: externalUser || getEnvVar(EnvironmentVariable.LastfmUsername) }
  };
  return fetch(generateAuthenticatedUrl(urlParams), { method: 'POST' });
};

export const makeRequest = (
  method: LastfmMethod,
  methodParams: Record<string, string | number>,
  externalUser?: string
): Promise<Response> => {
  const urlParams: GenerateUrlParams = {
    apiKey: getEnvVar(EnvironmentVariable.LastfmApiKey),
    method,
    methodParams: { ...methodParams, user: externalUser || getEnvVar(EnvironmentVariable.LastfmUsername) }
  };
  return fetch(generateUrl(urlParams), { method: 'GET' });
};
