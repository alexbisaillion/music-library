import styled from "styled-components";
import { TrackParamsResult } from "../../../../api/storage";
import { Artist } from "../../../../api/types";
import { SelectArtists } from "./SelectReleaseArtists";
import { SelectTrack } from "./SelectTrack";

const TrackInputContainer = styled.div`
  display: flex;
`;

const TrackNameContainer = styled.div`
  margin: 8px;
`;

type TrackInputProps = {
  trackParams: TrackParamsResult;
  addArtist: (newArtist: Artist) => void;
  setTrackName: (spotifyTrackId: string, trackName: string) => void;
};
export const TrackInput = (props: TrackInputProps) => {
  const { trackParams, addArtist, setTrackName } = props;

  const renderSelectTrack = () => {
    return (
      <TrackNameContainer>
        <SelectTrack trackParams={trackParams} setTrackName={setTrackName} />
      </TrackNameContainer>
    );
  };

  const renderRegisterTrackArtists = () => {
    if (trackParams.isRegistered) {
      return <></>;
    }

    return (
      <SelectArtists
        artistsParams={trackParams.spotifyTrack.artists}
        addArtist={addArtist}
      />
    );
  };

  return (
    <TrackInputContainer>
      {renderSelectTrack()}
      {renderRegisterTrackArtists()}
    </TrackInputContainer>
  );
};
