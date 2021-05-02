import { useState } from 'react';
import { createRelease, ReleaseParamsResult } from '../../../api/storage';
import { Release, ReleaseType } from '../../../api/types';
import { TextInput } from '../../common/forms/TextInput';
import { CreateIcon } from '../../icons/Material';

type SelectReleaseProps = {
  releaseParams: ReleaseParamsResult;
  artistIds: string[];
};
export const SelectRelease = (props: SelectReleaseProps) => {
  const { releaseParams, artistIds } = props;
  const [newReleaseName, setNewReleaseName] = useState(releaseParams.spotifyRelease?.name);
  const [newRelease, setNewRelease] = useState<Release>();

  const sendCreateRelease = async () => {
    if (releaseParams.isRegistered) {
      return;
    }

    const newRelease = await createRelease({
      artistIds,
      name: newReleaseName || releaseParams.spotifyRelease.name,
      releaseType: ReleaseType.Album,
      spotifyAlbumId: releaseParams.spotifyRelease.spotifyAlbumId
    });
    setNewRelease(newRelease);
  };

  if (releaseParams.isRegistered) {
    return (
      <TextInput
        isExternal={false}
        label="Stored Release"
        setValue={() => {}}
        value={releaseParams.existingRelease.name}
        id={releaseParams.existingRelease._id}
      />
    );
  }

  if (newRelease) {
    return (
      <TextInput
        isExternal={false}
        label="Created Release"
        setValue={() => {}}
        value={newRelease.name}
        id={newRelease._id}
      />
    );
  }

  return (
    <TextInput
      isExternal={true}
      label="Suggested Release"
      action={sendCreateRelease}
      icon={<CreateIcon />}
      setValue={setNewReleaseName}
      value={newReleaseName || releaseParams.spotifyRelease.name}
      id={releaseParams.spotifyRelease.spotifyAlbumId}
      disabled={artistIds.length < 1}
    />
  );
};
