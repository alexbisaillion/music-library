import styled from "styled-components";
import { ArtistParamsResult } from "../../../../api/storage";
import { Artist } from "../../../../api/types";
import { SelectArtist } from "./SelectArtist";

const RegisterArtistsContainer = styled.div`
  display: flex;
  && > * {
    margin: 8px;
  }
`;

type SelectArtistsProps = {
  artistsParams: ArtistParamsResult[];
  addArtist: (artist: Artist) => void;
};
export const SelectArtists = (props: SelectArtistsProps) => {
  const { artistsParams: artistParams, addArtist } = props;
  return (
    <RegisterArtistsContainer>
      {artistParams.map((artist) => (
        <SelectArtist
          key={
            artist.existingArtist
              ? artist.existingArtist._id
              : artist.spotifyArtist.spotifyArtistId
          }
          artistParams={artist}
          addArtist={addArtist}
        />
      ))}
    </RegisterArtistsContainer>
  );
};
