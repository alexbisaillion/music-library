import { useState } from 'react';
import { ReleaseParamsResult } from '../../../api/storage';
import { SelectReleaseArtists } from './SelectReleaseArtists';
import { SelectRelease } from './SelectRelease';

type ReleaseInputProps = {
  releaseParams: ReleaseParamsResult;
};
export const ReleaseInput = (props: ReleaseInputProps) => {
  const { releaseParams } = props;
  const [artistIds, setArtistIds] = useState<string[]>(
    releaseParams.existingRelease
      ? releaseParams.existingRelease.albumArtists.map((artist) => artist._id)
      : releaseParams.spotifyRelease.albumArtists
          .map((artist) => artist.existingArtist?._id || '')
          .filter((id) => id.length > 0)
  );

  const addArtist = (artistId: string) => {
    setArtistIds([...artistIds, artistId]);
  };

  const renderRegisterReleaseArtists = () => {
    if (releaseParams.isRegistered) {
      return <></>;
    }

    return <SelectReleaseArtists artistParams={releaseParams.spotifyRelease.albumArtists} addArtist={addArtist} />;
  };

  const renderRegisterRelease = () => {
    if (releaseParams.isRegistered) {
      return <></>;
    }

    return <SelectRelease artistIds={artistIds} releaseParams={releaseParams} />;
  };

  return (
    <>
      {renderRegisterReleaseArtists()}
      {renderRegisterRelease()}
    </>
  );
};
