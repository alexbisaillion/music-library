import styled from "styled-components";
import { PageContainer } from "../../common/Page";
import { AboutMe } from "./AboutMe";
import { Introduction } from "./Introduction";

const HomeContainer = styled.div`
  padding-top: 60px;
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
        <Introduction />
        <AboutMe />
      </HomeContainer>
    </PageContainer>
  );
};
