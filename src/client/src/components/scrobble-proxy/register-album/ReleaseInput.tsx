import styled from 'styled-components';
import { ReleaseParamsResult } from '../../../api/storage';
import { TextInput } from '../../common/forms/TextInput';
import { SpotifyIcon } from '../../icons/Spotify';

const RegisterArtistsContainer = styled.div`
  display: flex;
  && > * {
    margin: 8px;
  }
`;

type ReleaseInputProps = {
  releaseParams: ReleaseParamsResult;
};
export const ReleaseInput = (props: ReleaseInputProps) => {
  const { isRegistered, spotifyRelease } = props.releaseParams;

  const renderRegisterArtists = () => {
    return (
      <RegisterArtistsContainer>
        {spotifyRelease?.albumArtists.map((artist) => {
          if (!artist.isRegistered) {
            return (
              <TextInput
                key={artist.spotifyArtist.spotifyArtistId}
                icon={<SpotifyIcon />}
                isExternal
                label="Spotify Artist"
                setValue={() => {}}
                value={artist.spotifyArtist.name}
                id={artist.spotifyArtist.spotifyArtistId}
              />
            );
          }

          return (
            <TextInput
              key={artist.existingArtist._id}
              isExternal={false}
              label="Internal Artist"
              setValue={() => {}}
              value={artist.existingArtist.name}
              id={artist.existingArtist._id}
            />
          );
        })}
      </RegisterArtistsContainer>
    );
  };

  const renderRegisterAlbum = () => {
    if (!isRegistered && spotifyRelease) {
      return (
        <TextInput
          icon={<SpotifyIcon />}
          isExternal
          label="Spotify Release"
          setValue={() => {}}
          value={spotifyRelease.name}
          id={spotifyRelease.spotifyAlbumId}
        />
      );
    }
  };

  return (
    <>
      {renderRegisterArtists()}
      {renderRegisterAlbum()}
    </>
  );
};
