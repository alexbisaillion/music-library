import styled from "styled-components";
import { availableBrands } from "../../data/brands/brands";
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
                availableBrands.react,
                availableBrands.typescript,
                availableBrands.csharp,
                availableBrands.materialui,
                availableBrands.styledcomponents,
                availableBrands.jest,
              ],
            },
            {
              title: "Web Application Developer Co-op",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                availableBrands.react,
                availableBrands.typescript,
                availableBrands.redux,
                availableBrands.csharp,
                availableBrands.materialui,
                availableBrands.styledcomponents,
                availableBrands.jest,
              ],
            },
            {
              title: "Teaching Assistant - COMP 2406",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [
                availableBrands.javascript,
                availableBrands.nodedotjs,
                availableBrands.mongodb,
              ],
            },
            {
              title: "Platform Developer Co-op",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                availableBrands.csharp,
                { displayValue: availableBrands.dotnet.displayValue },
                availableBrands.java,
              ],
            },
            {
              title: "Teaching Assistant - COMP 1406",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [availableBrands.java, { displayValue: "JavaFX" }],
            },
            {
              title: "Software Developer",
              subtitle: "InGenius Software - Ottawa, ON",
              skillItems: [availableBrands.csharp, availableBrands.selenium],
            },
          ]}
        />
      </ExperienceContainer>
    </PageContainer>
  );
};
