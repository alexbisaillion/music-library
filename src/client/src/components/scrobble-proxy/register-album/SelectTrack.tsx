import { TrackParamsResult } from '../../../api/storage';
import { TextInput } from '../../common/forms/TextInput';

type SelectTrackProps = {
  trackParams: TrackParamsResult;
  setTrackName: (spotifyTrackId: string, trackName: string) => void;
};
export const SelectTrack = (props: SelectTrackProps) => {
  const { trackParams, setTrackName } = props;

  if (trackParams.isRegistered) {
    return (
      <TextInput
        isExternal={false}
        label="Stored Track"
        setValue={() => {}}
        value={trackParams.existingTrack.name}
        id={trackParams.existingTrack._id}
      />
    );
  }

  return (
    <TextInput
      isExternal={true}
      label="Suggested Track"
      setValue={(val) => setTrackName(trackParams.spotifyTrack.spotifyTrackId, val)}
      value={trackParams.spotifyTrack.name}
      id={trackParams.spotifyTrack.spotifyTrackId}
    />
  );
};
