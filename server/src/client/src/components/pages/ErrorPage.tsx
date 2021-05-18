import styled from 'styled-components';
import { PageContainer } from '../common/Page';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 8px;
  }
`;

export const ErrorPage = () => {
  return (
    <PageContainer>
      <ErrorContainer>
        <p>404</p>
      </ErrorContainer>
    </PageContainer>
  );
};
