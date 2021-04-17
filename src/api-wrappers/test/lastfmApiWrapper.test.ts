import { LastfmApiWrapper } from '../lastfmApiWrapper';
import fetch from 'node-fetch';
import { createHash, Hash } from 'crypto';

jest.mock('node-fetch', () => jest.fn());
jest.mock('crypto', () => ({
  createHash: jest.fn()
}));

describe('LastfmApiWrapper', () => {
  let nodeFetchSpy: jest.SpyInstance;
  let createHashSpy: jest.SpyInstance;
  const updateHashSpy = jest.fn();
  const digestHashSpy = jest.fn();

  const mockApiKey = 'mock-api-key';
  const mockSharedSecret = 'mock-shared-secret';
  const mockSession = 'mock-session';
  const mockUsername = 'mock-username';
  const mockSignature = 'mock-signature';

  const getLastfmApiWrapper = () => new LastfmApiWrapper(mockApiKey, mockSharedSecret, mockSession, mockUsername);

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
  });

  describe('scrobbleTrack', () => {
    it('makes a request to scrobble the specified track', async () => {
      const lastfmApiWrapper = getLastfmApiWrapper();

      await lastfmApiWrapper.scrobbleTrack({
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
        `http://ws.audioscrobbler.com/2.0/?format=json&album=After%20Hours&albumArtist=The%20Weeknd&artist=The%20Weeknd&timestamp=123&track=Blinding%20Lights&api_key=${mockApiKey}&sk=${mockSession}&method=track.scrobble&api_sig=${mockSignature}`,
        { method: 'POST' }
      );
    });

    it('can scrobble special characters', async () => {
      const lastfmApiWrapper = getLastfmApiWrapper();

      await lastfmApiWrapper.scrobbleTrack({
        album: 'Tranquility Base Hotel & Casino', // '&' character
        albumArtist: 'Arctic Monkeys',
        artist: 'Arctic Monkeys',
        track: 'One Point Perspective',
        timestamp: 123
      });

      expect(createHashSpy).toHaveBeenCalledWith('md5');

      expect(
        nodeFetchSpy
      ).toHaveBeenCalledWith(
        `http://ws.audioscrobbler.com/2.0/?format=json&album=Tranquility%20Base%20Hotel%20%26%20Casino&albumArtist=Arctic%20Monkeys&artist=Arctic%20Monkeys&timestamp=123&track=One%20Point%20Perspective&api_key=${mockApiKey}&sk=${mockSession}&method=track.scrobble&api_sig=${mockSignature}`,
        { method: 'POST' }
      );
    });
  });
});
