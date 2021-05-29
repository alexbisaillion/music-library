import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Body } from "../../common/text/Body";
import { SecondaryHeading } from "../../common/text/SecondaryHeading";
import { IconButton } from "../../common/forms/IconButton";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../../icons/material-icons";

const IntroductionContainer = styled.div`
  padding: 16px;
  display: flex;
`;

const BiographyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`;

const LinksContainer = styled.div`
  align-self: center;
  display: flex;
`;

export const Introduction = () => {
  return (
    <Paper elevation={3}>
      <IntroductionContainer>
        <BiographyContainer>
          <SecondaryHeading text="Hello there!" />
          <br />
          <Body text="I'm Alex Bisaillion, a full-stack software developer. Welcome to my website!" />
          <br />
          <LinksContainer>
            <IconButton onClick={() => {}} icon={<GitHubIcon />} />
            <IconButton onClick={() => {}} icon={<LinkedInIcon />} />
            <IconButton onClick={() => {}} icon={<MailIcon />} />
          </LinksContainer>
        </BiographyContainer>
      </IntroductionContainer>
    </Paper>
  );
};
