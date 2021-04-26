import styled from 'styled-components';
import { PageContainer } from '../common/Page';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 8px;
  }
`;

export const Home = () => {
  return (
    <PageContainer>
      <HomeContainer>
        <p>Hello friend.</p>
      </HomeContainer>
    </PageContainer>
  );
};
