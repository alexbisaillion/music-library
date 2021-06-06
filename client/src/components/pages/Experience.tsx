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
              image: "img/kinaxis.jpg",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                availableBrands.react,
                availableBrands.typescript,
                availableBrands.csharp,
                availableBrands.materialui,
                availableBrands.styledcomponents,
                availableBrands.jest,
              ],
              description: [
                "Continuing development on the next generation React client of Kinaxis' flagship product RapidResponse, bringing high-demand features to the product to encourage customer adoption.",
                "Implementing highly modular, reusable, and performant React components.",
                "Architecting elegant TypeScript source code, ensuring its resiliency to future change.",
                "Contribute to and make use of the in-house state management system to develop responsive data and event driven React components.",
                "Expand the RapidResponse .NET application server REST API with well-documented endpoints to complete the full-stack experience.",
                "Responsible as development prime for the delivery of core RapidResponse features.",
                "Gather requirements and elaborate feature work in an agile context, working aside the quality assurance and user experience teams.",
                "Actively monitor the performance of the product, stepping in to implement performance improvements or fixes whenever possible.",
                "Onboard, mentor, and integrate new co-op students to the team by providing assistance wherever possible.",
              ],
            },
            {
              title: "Web Application Developer Co-op",
              image: "img/kinaxis.jpg",
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
              description: [
                "Contributed to development on the first release of the next generation React client for Kinaxis' flagship product, RapidResponse.",
                "Worked alongside team members to deliver an expansive set of features required for initial adoption of the next generation client.",
                "The",
              ],
            },
            {
              title: "Teaching Assistant - COMP 2406",
              image: "img/carleton.jpg",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [
                availableBrands.javascript,
                availableBrands.nodedotjs,
                availableBrands.mongodb,
              ],
              description: [
                "Taught fundamental web development programming skills through weekly labs and office hours",
                "Developed highly accurate and readable solutions for class content",
                "Proctored and evaluated students’ work in assignments and exams",
              ],
            },
            {
              title: "Platform Developer Co-op",
              image: "img/kinaxis.jpg",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                availableBrands.csharp,
                { displayValue: availableBrands.dotnet.displayValue },
                availableBrands.java,
              ],
              description: [
                "Decoupled RapidResponse from a third-party library by developing a new API to abstract library usage, leading to vast improvements in product performance and reductions in upkeep costs",
              ],
            },
            {
              title: "Teaching Assistant - COMP 1406",
              image: "img/carleton.jpg",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [availableBrands.java, { displayValue: "JavaFX" }],
              description: ["Java Jesus"],
            },
            {
              title: "Software Developer",
              image: "img/ingenius.jpg",
              subtitle: "InGenius Software - Ottawa, ON",
              skillItems: [availableBrands.csharp, availableBrands.selenium],
              description: [
                "Worked within the automation team to automate testing of the InGenius Connector Enterprise product",
                "Contributed new functionality to the automation framework to facilitate the output of automated tests",
              ],
            },
          ]}
        />
      </ExperienceContainer>
    </PageContainer>
  );
};
