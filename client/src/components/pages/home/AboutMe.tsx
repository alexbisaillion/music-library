import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Body } from "../../common/text/Body";
import { SecondaryHeading } from "../../common/text/SecondaryHeading";

const AboutMeContainer = styled.div`
  padding: 16px;
  display: flex;
`;

const BiographyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AboutMe = () => {
  return (
    <Paper elevation={3}>
      <AboutMeContainer>
        <BiographyContainer>
          <SecondaryHeading text="About me" />
          <br />
          <Body text="I'm a full-stack software developer based in Ottawa, Canada. I graduated with a degree in Computer Science from Carleton University in December 2020. Currently, I'm working as a software developer at Kinaxis, where I leverage some of the latest technologies in web development on a daily basis." />
          <br />
          <Body text="My greatest joy in software development is the production of full-stack web applications. I strive to learn everything I can about each level of the stack, especially in the contexts of designing MongoDB database schemas, building REST APIs with Node.js and Express, or constructing performant user interfaces with React." />
          <br />
          <Body text="Outside of software development, I normally spend my time working out, listening to music, or watching movies." />
        </BiographyContainer>
        <img width="400" height="400" alt="Me" src="me.jpg" />
      </AboutMeContainer>
    </Paper>
  );
};
