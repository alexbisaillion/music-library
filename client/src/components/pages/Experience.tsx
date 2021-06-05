import styled from "styled-components";
import { Timeline } from "../common/display/timeline/Timeline";
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
            {
              title: "Software Developer",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                { label: "React" },
                { label: "TypeScript" },
                { label: "Material-UI" },
                { label: "Styled Components" },
                { label: "Jest" },
                { label: "C#" },
              ],
            },
            {
              title: "Web Application Developer Co-op",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                { label: "React" },
                { label: "TypeScript" },
                { label: "Redux" },
                { label: "Material-UI" },
                { label: "Styled Components" },
                { label: "Jest" },
              ],
            },
            {
              title: "Teaching Assistant - COMP 2406",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [
                { label: "JavaScript" },
                { label: "Node.js" },
                { label: "MongoDB" },
              ],
            },
            {
              title: "Platform Developer Co-op",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                { label: "C#" },
                { label: ".NET" },
                { label: "Java" },
              ],
            },
            {
              title: "Teaching Assistant - COMP 1406",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [{ label: "Java" }, { label: "JavaFX" }],
            },
            {
              title: "Software Developer",
              subtitle: "InGenius Software - Ottawa, ON",
              skillItems: [{ label: "C#" }, { label: "Selenium" }],
            },
          ]}
        />
      </ExperienceContainer>
    </PageContainer>
  );
};
