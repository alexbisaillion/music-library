import styled from "styled-components";
import { Timeline } from "../common/display/timeline/TImeline";
import { PageContainer } from "../common/Page";

const ExperienceContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 16px;
  }
`;

export const Experience = () => {
  return (
    <PageContainer>
      <ExperienceContainer>
        <Timeline
          entries={[
            { title: "Software Developer", subtitle: "Kinaxis - Ottawa, ON" },
            {
              title: "Web Application Developer Co-op",
              subtitle: "Kinaxis - Ottawa, ON",
            },
            {
              title: "Teaching Assistant - COMP 2406",
              subtitle: "Carleton University - Ottawa, ON",
            },
            {
              title: "Platform Developer Co-op",
              subtitle: "Kinaxis - Ottawa, ON",
            },
            {
              title: "Teaching Assistant - COMP 1406",
              subtitle: "Carleton University - Ottawa, ON",
            },
            {
              title: "Software Developer",
              subtitle: "InGenius Software - Ottawa, ON",
            },
          ]}
        />
      </ExperienceContainer>
    </PageContainer>
  );
};
