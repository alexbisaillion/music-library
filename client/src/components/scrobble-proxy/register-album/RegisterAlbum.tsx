import { useState } from "react";
import styled from "styled-components";
import { AlbumParamsResponse, getAlbumParams } from "../../../api/storage";
import { Artist, Release } from "../../../api/types";
import { PageContainer } from "../../common/Page";
import { FetchAlbum } from "./FetchAlbum";
import { SelectRelease } from "./SelectRelease";
import { SelectArtists } from "./SelectReleaseArtists";
import { TrackInputs } from "./TrackInputs";

const RegisterAlbumContainer = styled.div`
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 8px;
  }
`;

export enum RegisterAlbumState {
  InputSpotifyId,
  CreateAlbumArtists,
  CreateRelease,
  CreateTracks,
}

export const RegisterAlbum = () => {
  const [registerAlbumState, setRegisterAlbumState] = useState(
    RegisterAlbumState.InputSpotifyId
  );
  const [initialAlbumParams, setInitialAlbumParams] =
    useState<AlbumParamsResponse>();
  const [albumArtistIds, setAlbumArtistIds] = useState<string[]>();
  const [releaseDocument, setReleaseDocument] = useState<Release>();

  const setAlbumParams = (albumParams: AlbumParamsResponse) => {
    setInitialAlbumParams(albumParams);

    if (albumParams.release.isRegistered) {
      setReleaseDocument(albumParams.release.existingRelease);
      setRegisterAlbumState(RegisterAlbumState.CreateTracks);
      return;
    }

    const registeredAlbumArtistIds: string[] = [];
    for (const artist of albumParams.release.spotifyRelease.albumArtists) {
      if (artist.isRegistered) {
        registeredAlbumArtistIds.push(artist.existingArtist._id);
      }
    }

    if (
      registeredAlbumArtistIds.length ===
      albumParams.release.spotifyRelease.albumArtists.length
    ) {
      setAlbumArtistIds(registeredAlbumArtistIds);
      setRegisterAlbumState(RegisterAlbumState.CreateRelease);
      return;
    }

    setRegisterAlbumState(RegisterAlbumState.CreateAlbumArtists);
  };

  const renderFetchAlbum = () => {
    if (registerAlbumState !== RegisterAlbumState.InputSpotifyId) {
      return <></>;
    }

    return <FetchAlbum setAlbumParams={setAlbumParams} />;
  };

  const addAlbumArtist = (artist: Artist) => {
    if (!initialAlbumParams || initialAlbumParams.release.isRegistered) {
      return;
    }

    const { _id: artistId } = artist;

    const newAlbumArtistIds = albumArtistIds
      ? [...albumArtistIds, artistId]
      : [artistId];
    setAlbumArtistIds(
      albumArtistIds ? [...albumArtistIds, artistId] : [artistId]
    );
    if (
      newAlbumArtistIds.length ===
      initialAlbumParams.release.spotifyRelease.albumArtists.length
    ) {
      setRegisterAlbumState(RegisterAlbumState.CreateRelease);
    }
  };

  const renderInputAlbumArtists = () => {
    if (
      registerAlbumState !== RegisterAlbumState.CreateAlbumArtists ||
      !initialAlbumParams ||
      initialAlbumParams.release.isRegistered
    ) {
      return <></>;
    }

    return (
      <SelectArtists
        artistsParams={initialAlbumParams.release.spotifyRelease.albumArtists}
        addArtist={addAlbumArtist}
      />
    );
  };

  const addRelease = async (release: Release) => {
    setReleaseDocument(release);
    const updatedAlbumParams = await getAlbumParams(release.spotifyIds[0]);
    setInitialAlbumParams(updatedAlbumParams);
    setRegisterAlbumState(RegisterAlbumState.CreateTracks);
  };

  const renderInputRelease = () => {
    if (
      registerAlbumState !== RegisterAlbumState.CreateRelease ||
      !initialAlbumParams ||
      !albumArtistIds ||
      initialAlbumParams.release.isRegistered
    ) {
      return <></>;
    }

    return (
      <SelectRelease
        artistIds={albumArtistIds}
        releaseParams={initialAlbumParams.release}
        setReleaseDocument={addRelease}
      />
    );
  };

  const renderTrackInputs = () => {
    if (
      registerAlbumState !== RegisterAlbumState.CreateTracks ||
      !initialAlbumParams ||
      !releaseDocument
    ) {
      return <></>;
    }

    return (
      <TrackInputs
        tracksParams={initialAlbumParams.tracks}
        release={releaseDocument}
      />
    );
  };

  return (
    <PageContainer>
      <RegisterAlbumContainer>
        {renderFetchAlbum()}
        {renderInputAlbumArtists()}
        {renderInputRelease()}
        {renderTrackInputs()}
      </RegisterAlbumContainer>
    </PageContainer>
  );
};
