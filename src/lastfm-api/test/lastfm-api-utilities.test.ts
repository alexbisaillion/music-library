import { makeAuthenticatedRequest } from '../lastfm-api-utilities';
import fetch from 'node-fetch';
import { createHash, Hash } from 'crypto';
import { LastfmMethod } from '../lastfm-api-types';
import * as EnvVars from '../../helpers/environment-variables';

jest.mock('node-fetch', () => jest.fn());
jest.mock('crypto', () => ({
  createHash: jest.fn()
}));

describe('lastfm-api-utilities', () => {
  describe('makeAuthenticatedRequest', () => {
    let nodeFetchSpy: jest.SpyInstance;
    let createHashSpy: jest.SpyInstance;
    const updateHashSpy = jest.fn();
    const digestHashSpy = jest.fn();

    const mockApiKey = 'mock-api-key';
    const mockSession = 'mock-session';
    const mockSharedSecret = 'mock-shared-secret';
    const mockUsername = 'mock-username';
    const mockSignature = 'mock-signature';

    beforeEach(() => {
      jest.clearAllMocks();
      nodeFetchSpy = (fetch as jest.MockedFunction<typeof fetch>).mockImplementation();

      // Awkward mocking due to bugs in jest 26.6.3.
      // https://github.com/facebook/jest/issues/10996
      // https://github.com/facebook/jest/issues/10612
      const hashObj: Partial<Hash> = {
        update: updateHashSpy.mockReturnValue({ digest: digestHashSpy.mockReturnValue(mockSignature) })
      };
      createHashSpy = (createHash as jest.MockedFunction<typeof createHash>).mockReturnValue(hashObj as Hash);

      jest
        .spyOn(EnvVars, 'getEnvVar')
        .mockReturnValueOnce(mockApiKey)
        .mockReturnValueOnce(mockSession)
        .mockReturnValueOnce(mockSharedSecret)
        .mockReturnValueOnce(mockUsername);
    });

    it('generates the proper url and makes a request', async () => {
      await makeAuthenticatedRequest(LastfmMethod.Scrobble, {
        album: 'After Hours',
        albumArtist: 'The Weeknd',
        artist: 'The Weeknd',
        track: 'Blinding Lights',
        timestamp: 123
      });

      expect(createHashSpy).toHaveBeenCalledWith('md5');
      expect(updateHashSpy).toHaveBeenCalledWith(expect.anything(), 'utf8');

      expect(
        nodeFetchSpy
      ).toHaveBeenCalledWith(
        `http://ws.audioscrobbler.com/2.0/?format=json&album=After%20Hours&albumArtist=The%20Weeknd&artist=The%20Weeknd&track=Blinding%20Lights&timestamp=123&user=${mockUsername}&api_key=${mockApiKey}&sk=${mockSession}&method=track.scrobble&api_sig=${mockSignature}`,
        { method: 'POST' }
      );
    });

    it('generates the proper url with special characters and makes a request', async () => {
      await makeAuthenticatedRequest(LastfmMethod.Scrobble, {
        album: 'Tranquility Base Hotel & Casino', // '&' character
        albumArtist: 'Arctic Monkeys',
        artist: 'Arctic Monkeys',
        track: 'One Point Perspective',
        timestamp: 123
      });

      expect(createHashSpy).toHaveBeenCalledWith('md5');
      expect(updateHashSpy).toHaveBeenCalledWith(expect.anything(), 'utf8');

      expect(
        nodeFetchSpy
      ).toHaveBeenCalledWith(
        `http://ws.audioscrobbler.com/2.0/?format=json&album=Tranquility%20Base%20Hotel%20%26%20Casino&albumArtist=Arctic%20Monkeys&artist=Arctic%20Monkeys&track=One%20Point%20Perspective&timestamp=123&user=${mockUsername}&api_key=${mockApiKey}&sk=${mockSession}&method=track.scrobble&api_sig=${mockSignature}`,
        { method: 'POST' }
      );
    });
  });
});
