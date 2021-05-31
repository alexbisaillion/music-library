import styled from "styled-components";
import { ImageCard } from "../../common/display/ImageCard";

const HomeCardsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const HomeCards = () => {
  return (
    <HomeCardsContainer>
      <ImageCard
        height={500}
        width={345}
        image="img/me.jpg"
        title="About Me"
        description={[
          "I graduated with a degree in Computer Science from Carleton University in December 2020. Currently, I'm working as a software developer at Kinaxis, a supply chain management software company based in Kanata, Ontario. As a developer at Kinaxis, I leverage some of the latest technologies in web development on a daily basis.",
          "My greatest joy in software development is the production of full-stack web applications. I strive to learn everything I can about each level of the stack, especially in the contexts of designing MongoDB database schemas, building REST APIs with Node.js and Express, or constructing performant user interfaces with React.",
          "Outside of software development, I normally spend my time working out, listening to music, or watching movies.",
        ]}
        linkInfo={{ isInternal: true, link: "employment", label: "View" }}
      />
      <ImageCard
        height={200}
        width={345}
        image="img/me.jpg"
        title="Experience"
        description="A walkthrough of my work experience as a software developer, chronicling the technologies and projects I've worked on professionally."
        linkInfo={{ isInternal: true, link: "employment", label: "View" }}
      />
      <ImageCard
        height={200}
        width={345}
        image="img/me.jpg"
        title="Projects"
        description="A timeline visualization of the side projects I've created to supplement my professional software development experience."
        linkInfo={{ isInternal: true, link: "projects", label: "View" }}
      />
    </HomeCardsContainer>
  );
};
