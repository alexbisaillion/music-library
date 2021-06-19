import styled from "styled-components";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../../icons/material-icons";
import { LinkIconButton } from "../../common/forms/LinkIconButton";
import { LinkTextButton } from "../../common/forms/LinkTextButton";
import { ImageCard } from "../../common/display/ImageCard";
import { TextCard } from "../../common/display/TextCard";

const IntroductionContainer = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    && > * {
      margin: 16px 0;
    }
  }
  width: 100%;
`;

const WelcomeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sixing: border-box;
  @media only screen and (min-width: 768px) {
    margin-right: 8px;
    width: 40%;
  }
`;

const LinksColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sixing: border-box;
  @media only screen and (min-width: 768px) {
    margin-left: 8px;
    width: 60%;
  }
  @media only screen and (max-width: 768px) {
    && > * {
      margin: 8px 0;
    }
  }
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  && > * {
    padding: 0 4px;
  }
`;

export const Introduction = () => {
  return (
    <IntroductionContainer>
      <WelcomeColumn>
        <ImageCard
          height={350}
          width="100%"
          image="img/me.jpg"
          title="Welcome!"
          description="I'm Alex Bisaillion, a full-stack software developer based in Ottawa, Canada. This is my personal website."
          action={
            <LinksContainer>
              <LinkIconButton
                link="https://github.com/alexbisaillion"
                icon={<GitHubIcon size="large" />}
              />
              <LinkIconButton
                link="https://www.linkedin.com/in/alexbisaillion/"
                icon={<LinkedInIcon size="large" />}
              />
              <LinkIconButton
                link="mailto:a.bisaillion@gmail.com"
                icon={<MailIcon size="large" />}
              />
              <LinkTextButton
                link="resume.pdf"
                isInternal={false}
                label="My Resume"
              />
            </LinksContainer>
          }
        />
      </WelcomeColumn>
      <LinksColumn>
        <TextCard
          width="100%"
          image="img/me.jpg"
          title="Experience"
          description="A walkthrough of my work experience as a software developer, chronicling the technologies and projects I've worked on professionally."
          linkInfo={{ isInternal: true, link: "experience", label: "View" }}
        />
        <TextCard
          width="100%"
          image="img/me.jpg"
          title="Education"
          description="An overview of my accomplishments as an undergraduate computer science student at Carleton University."
          linkInfo={{ isInternal: true, link: "education", label: "View" }}
        />
        <TextCard
          width="100%"
          image="img/me.jpg"
          title="Projects"
          description="A timeline visualization of the side projects I've created to supplement my professional software development experience."
          linkInfo={{ isInternal: true, link: "projects", label: "View" }}
        />
      </LinksColumn>
    </IntroductionContainer>
  );
};
