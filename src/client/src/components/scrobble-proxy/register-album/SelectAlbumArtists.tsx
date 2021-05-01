import { useState } from 'react';
import styled from 'styled-components';
import { ArtistParamsResult, createArtist } from '../../../api/storage';
import { Artist } from '../../../api/types';
import { TextInput } from '../../common/forms/TextInput';
import { CreateIcon } from '../../icons/Material';

const RegisterArtistsContainer = styled.div`
  display: flex;
  && > * {
    margin: 8px;
  }
`;

type ReleaseInputProps = {
  artistParams: ArtistParamsResult[];
};
export const SelectAlbumArtists = (props: ReleaseInputProps) => {
  const { artistParams } = props;
  return (
    <RegisterArtistsContainer>
      {artistParams.map((artist) => (
        <SelectAlbumArtist
          key={artist.existingArtist ? artist.existingArtist._id : artist.spotifyArtist.spotifyArtistId}
          artistParams={artist}
        />
      ))}
    </RegisterArtistsContainer>
  );
};

type SelectAlbumArtistProps = {
  artistParams: ArtistParamsResult;
};
const SelectAlbumArtist = (props: SelectAlbumArtistProps) => {
  const { artistParams } = props;
  const [newArtist, setNewArtist] = useState<Artist>();

  const sendCreateArtist = async () => {
    if (artistParams.isRegistered) {
      return;
    }

    const newArtist = await createArtist(artistParams.spotifyArtist.spotifyArtistId, artistParams.spotifyArtist.name);
    setNewArtist(newArtist);
  };

  if (artistParams.isRegistered) {
    return (
      <TextInput
        isExternal={false}
        label="Stored Artist"
        setValue={() => {}}
        value={artistParams.existingArtist.name}
        id={artistParams.existingArtist._id}
      />
    );
  }

  if (newArtist) {
    return (
      <TextInput
        isExternal={false}
        label="Created Artist"
        setValue={() => {}}
        value={newArtist.name}
        id={newArtist._id}
      />
    );
  }

  return (
    <TextInput
      isExternal={true}
      label="Suggested Artist"
      action={sendCreateArtist}
      icon={<CreateIcon />}
      setValue={() => {}}
      value={artistParams.spotifyArtist.name}
      id={artistParams.spotifyArtist.spotifyArtistId}
    />
  );
};
