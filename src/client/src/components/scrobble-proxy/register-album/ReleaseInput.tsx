import { ReleaseParamsResult } from '../../../api/storage';
import { SelectAlbumArtists } from './SelectAlbumArtists';

type ReleaseInputProps = {
  releaseParams: ReleaseParamsResult;
};
export const ReleaseInput = (props: ReleaseInputProps) => {
  const { releaseParams } = props;

  const renderRegisterAlbumArtists = () => {
    if (releaseParams.isRegistered) {
      return <></>;
    }

    return <SelectAlbumArtists artistParams={releaseParams.spotifyRelease.albumArtists} />;
  };

  return <>{renderRegisterAlbumArtists()}</>;
};
