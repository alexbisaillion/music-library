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
              initial: "K",
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
                "Continuing development on the next generation React client of Kinaxis' flagship product RapidResponse.",
                "Bring high-demand features to the product to encourage customer adoption",
                "Implement highly modular, reusable, and performant React components.",
                "Architect elegant TypeScript source code that is highly resilient to future change.",
                "Contribute to and make use of the in-house state management system to develop responsive data and event driven React components.",
                "Expand the RapidResponse .NET application server REST API with well-documented endpoints to complete the full-stack experience.",
                "Responsible as development prime for the delivery of core RapidResponse features.",
                "Gather requirements and elaborate feature work in an agile context, working aside the quality assurance and user experience teams.",
                "Actively monitor the performance of the product, stepping in to implement performance improvements or fixes whenever possible.",
                "Onboard, mentor, and integrate new team members by providing assistance wherever possible.",
              ],
              start: "January 2021",
              end: "Present",
            },
            {
              title: "Web Application Developer Co-op",
              initial: "K",
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
                "First co-op placement on the web team at Kinaxis.",
                "Contributed to development on the first release of the next generation React client of Kinaxis' flagship product, RapidResponse.",
                "Worked alongside team members to deliver an expansive set of features required for initial adoption of the next generation client.",
                "Developed React components to form the basis of features in the product, while writing business logic to interface with the UI in pure TypeScript.",
                "Participated in the agile software development cycle, including daily stand-ups, planning, demonstrations, and retrospectives.",
                "Fixed defects in the product, while increasing unit and end-to-end test coverage wherever possible to ensure quality is maintained.",
              ],
              start: "May 2020",
              end: "December 2020",
            },
            {
              title: "Teaching Assistant - Fundamentals of Web Applications",
              initial: "C",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [
                availableBrands.javascript,
                availableBrands.nodedotjs,
                availableBrands.mongodb,
              ],
              description: [
                "Final semesters as a teaching assistant at Carleton University.",
                "Taught fundamental web development programming skills to the students of COMP 2406 through weekly labs and office hours.",
                "Proctored and evaluated students’ work in assignments and exams.",
              ],
              start: "September 2019",
              end: "April 2020",
            },
            {
              title: "Platform Developer Co-op",
              initial: "K",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [
                availableBrands.csharp,
                { displayValue: availableBrands.dotnet.displayValue },
                availableBrands.java,
              ],
              description: [
                "Co-op work term with the freshly minted Platform team at Kinaxis, specializing in developing Kinaxis' RapidResponse as a platform for customers to build on.",
                "Decoupled RapidResponse from a third-party library by developing a new API to abstract library usage, leading to vast improvements in product performance and reductions in upkeep costs",
              ],
              start: "May 2019",
              end: "August 2019",
            },
            {
              title: "Teaching Assistant - Introduction to Computer Science II",
              initial: "C",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [availableBrands.java, { displayValue: "JavaFX" }],
              description: [
                "Final semester as a teaching assistant for COMP 1406 at Carleton University.",
                "Continued to teach students object-oriented programming in Java.",
                "Worked with the professor, lab coordinators, and fellow teaching assistants to introduce an automated assignment marking system to the course offering.",
                "Troubleshooted issues and provided guidance to students in their assignment work.",
              ],
              start: "January 2019",
              end: "April 2019",
            },
            {
              title: "Application Developer Co-op",
              initial: "K",
              subtitle: "Kinaxis - Ottawa, ON",
              skillItems: [availableBrands.csharp, availableBrands.java],
              description: [
                "First co-op placement with Kinaxis, working on the Application Team to support the Java client of Kinaxis' flagship product, RapidResponse.",
                "Designed and implemented a consolidated C# server-side resource name validation system to replace inconsistent validation on the Java client.",
                "Implemented redesigns of existing Java Swing components to streamline the product visuals and increase usability.",
              ],
              start: "September 2018",
              end: "December 2018",
            },
            {
              title: "Software Developer",
              initial: "I",
              subtitle: "InGenius Software - Ottawa, ON",
              skillItems: [availableBrands.csharp, availableBrands.selenium],
              description: [
                "First co-op work term as a computer science student, working on the automation team at InGenius Software.",
                "Automated testing of the InGenius Connector Enterprise product by translating manual tests into end-to-end Selenium tests written in C#.",
                "Contributed new functionality to the automation framework, written in C#, to facilitate the output of automated tests",
              ],
              start: "May 2018",
              end: "August 2018",
            },
            {
              title: "Teaching Assistant - Introduction to Computer Science II",
              initial: "C",
              subtitle: "Carleton University - Ottawa, ON",
              skillItems: [availableBrands.java, { displayValue: "JavaFX" }],
              description: [
                "Worked for 3 semesters under the supervision of Professor Jason Hinek as a teaching assistant for COMP 1406, Carleton University's second fundamental introductory offering in the computer science program",
              ],
              start: "July 2017",
              end: "April 2018",
            },
          ]}
        />
      </ExperienceContainer>
    </PageContainer>
  );
};
