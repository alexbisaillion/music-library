import styled from "styled-components";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../../icons/material-icons";
import { LinkIconButton } from "../../common/forms/LinkIconButton";
import { LinkTextButton } from "../../common/forms/LinkTextButton";
import { ImageCard } from "../../common/display/ImageCard";

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
    <ImageCard
      height={250}
      width="100%"
      image="img/splash.jpg"
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
  );
};
