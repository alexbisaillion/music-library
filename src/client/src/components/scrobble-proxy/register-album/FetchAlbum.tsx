import { useState } from 'react';
import styled from 'styled-components';
import { TextButton } from '../../common/forms/TextButton';
import { TextInput } from '../../common/forms/TextInput';
import { AlbumParamsResponse, getAlbumParams } from '../../../api/storage';

const GetAlbumTracksContainer = styled.div`
  display: flex;
  && > * {
    margin: 16px;
  }
`;

type FetchAlbumProps = {
  setAlbumParams: (params: AlbumParamsResponse) => void;
};
export const FetchAlbum = (props: FetchAlbumProps) => {
  const { setAlbumParams } = props;

  const [albumId, setAlbumId] = useState('');
  const [isFetched, setIsFetched] = useState(false);

  const fetchAlbumParams = async () => {
    const albumParams = await getAlbumParams(albumId);
    setIsFetched(true);
    setAlbumParams(albumParams);
  };

  return (
    <GetAlbumTracksContainer>
      <TextInput value={albumId} setValue={setAlbumId} label="Spotify Album ID" isExternal={isFetched} />
      <TextButton onClick={fetchAlbumParams} label="Get Album Info" />
    </GetAlbumTracksContainer>
  );
};
