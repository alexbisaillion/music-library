import { useState } from 'react';
import { TrackParamsResult } from '../../../api/storage';
import { Artist, Release } from '../../../api/types';
import { TextInput } from '../../common/forms/TextInput';
import { StripIcon } from '../../icons/Material';
import { TrackInput } from './TrackInput';
import produce from 'immer';

type TrackInputsProps = {
  tracksParams: TrackParamsResult[];
  release: Release;
};
export const TrackInputs = (props: TrackInputsProps) => {
  const { tracksParams } = props;
  const [tracks, setTracks] = useState<TrackParamsResult[]>(tracksParams);
  const [commonTerm, setCommonTerm] = useState('');

  const addArtist = (newArtist: Artist) => {
    const [spotifyArtistId] = newArtist.spotifyIds;
    setTracks(
      produce(tracks, (draft) => {
        for (const track of draft) {
          if (track.isRegistered) {
            continue;
          }
          for (const artist of track.spotifyTrack.artists) {
            if (artist.spotifyArtist?.spotifyArtistId === spotifyArtistId) {
              artist.existingArtist = { _id: newArtist._id, name: newArtist.name };
              artist.isRegistered = true;
            }
          }
        }
      })
    );
  };

  const setTrackName = (spotifyTrackId: string, trackName: string) => {
    setTracks(
      produce(tracks, (draft) => {
        const spotifyTrack = draft.find((track) => track.spotifyTrack?.spotifyTrackId === spotifyTrackId)?.spotifyTrack;
        if (spotifyTrack) {
          spotifyTrack.name = trackName;
        }
      })
    );
  };

  const stripTerm = () => {
    setTracks(
      produce(tracks, (draft) => {
        for (const track of draft) {
          if (track.isRegistered) {
            continue;
          }
          track.spotifyTrack.name = track.spotifyTrack.name.replace(commonTerm, '');
        }
      })
    );
  };

  return (
    <>
      <TextInput
        icon={<StripIcon />}
        action={stripTerm}
        isExternal={false}
        label="Strip Common Term"
        setValue={setCommonTerm}
        value={commonTerm}
      />
      {tracks.map((track) => (
        <TrackInput
          key={track.isRegistered ? track.existingTrack._id : track.spotifyTrack.spotifyTrackId}
          trackParams={track}
          addArtist={addArtist}
          setTrackName={setTrackName}
        />
      ))}
    </>
  );
};
