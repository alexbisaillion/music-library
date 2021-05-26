import { useState } from "react";
import { ArtistParamsResult, createArtist } from "../../../api/storage";
import { Artist } from "../../../api/types";
import { TextInput } from "../../common/forms/TextInput";
import { CreateIcon } from "../../icons/material-icons";

type SelectArtistProps = {
  artistParams: ArtistParamsResult;
  addArtist: (newArtist: Artist) => void;
};
export const SelectArtist = (props: SelectArtistProps) => {
  const { artistParams, addArtist } = props;
  const [newArtist, setNewArtist] = useState<Artist>();

  const sendCreateArtist = async () => {
    if (artistParams.isRegistered) {
      return;
    }

    const newArtist = await createArtist(
      artistParams.spotifyArtist.spotifyArtistId,
      artistParams.spotifyArtist.name
    );
    addArtist(newArtist);
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
