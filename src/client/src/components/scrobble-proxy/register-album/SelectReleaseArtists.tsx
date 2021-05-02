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

type SelectReleaseArtistsProps = {
  artistParams: ArtistParamsResult[];
  addArtist: (artistId: string) => void;
};
export const SelectReleaseArtists = (props: SelectReleaseArtistsProps) => {
  const { artistParams, addArtist } = props;
  return (
    <RegisterArtistsContainer>
      {artistParams.map((artist) => (
        <SelectReleaseArtist
          key={artist.existingArtist ? artist.existingArtist._id : artist.spotifyArtist.spotifyArtistId}
          artistParams={artist}
          addArtist={addArtist}
        />
      ))}
    </RegisterArtistsContainer>
  );
};

type SelectReleaseArtistProps = {
  artistParams: ArtistParamsResult;
  addArtist: (artistId: string) => void;
};
const SelectReleaseArtist = (props: SelectReleaseArtistProps) => {
  const { artistParams, addArtist } = props;
  const [newArtist, setNewArtist] = useState<Artist>();

  const sendCreateArtist = async () => {
    if (artistParams.isRegistered) {
      return;
    }

    const newArtist = await createArtist(artistParams.spotifyArtist.spotifyArtistId, artistParams.spotifyArtist.name);
    addArtist(newArtist._id);
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
