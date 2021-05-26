import { useState } from "react";
import {
  createManyTracks,
  TrackParamsResult,
  CreateTrackParams,
} from "../../../api/storage";
import { Artist, Release } from "../../../api/types";
import { TextInput } from "../../common/forms/TextInput";
import { StripIcon } from "../../icons/material-icons";
import { TrackInput } from "./TrackInput";
import produce from "immer";
import { TextButton } from "../../common/forms/TextButton";

type TrackInputsProps = {
  tracksParams: TrackParamsResult[];
  release: Release;
};
export const TrackInputs = (props: TrackInputsProps) => {
  const { tracksParams, release } = props;
  const [tracks, setTracks] = useState<TrackParamsResult[]>(tracksParams);
  const [commonTerm, setCommonTerm] = useState("");

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
              artist.existingArtist = {
                _id: newArtist._id,
                name: newArtist.name,
              };
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
        const spotifyTrack = draft.find(
          (track) => track.spotifyTrack?.spotifyTrackId === spotifyTrackId
        )?.spotifyTrack;
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
          track.spotifyTrack.name = track.spotifyTrack.name.replace(
            commonTerm,
            ""
          );
        }
      })
    );
  };

  const isCreateTracksDisabled = () => {
    return tracks.some(
      (track) =>
        !track.isRegistered &&
        track.spotifyTrack.artists.some((artist) => !artist.isRegistered)
    );
  };

  const createTracks = async () => {
    await createManyTracks(
      tracks.reduce((tracks, currentTrack) => {
        if (!currentTrack.isRegistered) {
          tracks.push({
            spotifyTrackId: currentTrack.spotifyTrack.spotifyTrackId,
            artistIds: currentTrack.spotifyTrack.artists.reduce(
              (artists, currentArtist) => {
                if (currentArtist.isRegistered) {
                  artists.push(currentArtist.existingArtist._id);
                }
                return artists;
              },
              [] as string[]
            ),
            name: currentTrack.spotifyTrack.name,
            releaseId: release._id,
          });
        }
        return tracks;
      }, [] as CreateTrackParams[])
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
      <TextButton
        label="Save Tracks"
        disabled={isCreateTracksDisabled()}
        onClick={createTracks}
      />
      {tracks.map((track) => (
        <TrackInput
          key={
            track.isRegistered
              ? track.existingTrack._id
              : track.spotifyTrack.spotifyTrackId
          }
          trackParams={track}
          addArtist={addArtist}
          setTrackName={setTrackName}
        />
      ))}
    </>
  );
};
