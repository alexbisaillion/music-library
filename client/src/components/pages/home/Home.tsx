import styled from "styled-components";
import { PageContainer } from "../../common/Page";
import { HomeCards } from "./HomeCards";
import { Introduction } from "./Introduction";

const HomeContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 16px;
  }
`;

export const Home = () => {
  return (
    <PageContainer>
      <HomeContainer>
        <Introduction />
        <HomeCards />
      </HomeContainer>
    </PageContainer>
  );
};
