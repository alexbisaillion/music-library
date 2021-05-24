import styled from "styled-components";
import { PageContainer } from "../common/Page";
import { MainHeading } from "../common/text/MainHeading";
import { SecondaryHeading } from "../common/text/SecondaryHeading";

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
        <MainHeading text="Alex Bisaillion" />
        <SecondaryHeading
          text={["Software developer.", "Something else.", "Another thing."]}
          useTypewriterEffect
        />
      </HomeContainer>
    </PageContainer>
  );
};
