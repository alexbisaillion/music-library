import { useState } from 'react';
import styled from 'styled-components';
import { AlbumParamsResponse } from '../../../api/storage';
import { PageContainer } from '../../common/Page';
import { FetchAlbum } from './FetchAlbum';
import { ReleaseInput } from './ReleaseInput';

const RegisterAlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 8px;
  }
`;

export const RegisterAlbum = () => {
  const [albumParams, setAlbumParams] = useState<AlbumParamsResponse>();

  const renderReleaseInput = () => {
    if (!albumParams) {
      return <></>;
    }

    return <ReleaseInput releaseParams={albumParams.release} />;
  };

  return (
    <PageContainer>
      <RegisterAlbumContainer>
        <FetchAlbum setAlbumParams={setAlbumParams} />
        {renderReleaseInput()}
      </RegisterAlbumContainer>
    </PageContainer>
  );
};
