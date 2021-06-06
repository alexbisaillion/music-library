import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { CircularImage } from "../../images/CircularImage";
import { Chip } from "../../text/Chip";
import { Heading } from "../../text/Heading";
import { Subtitle } from "../../text/Subtitle";

const StyledPaper = styled(Paper)`
  padding: 16px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  && > * {
    margin: 4px;
  }
`;

export type TimelineEntryProps = {
  title: string;
  subtitle: string;
  skillItems: { icon?: JSX.Element; displayValue: string }[];
};

export const TimelineEntry = ({
  title,
  subtitle,
  skillItems,
}: TimelineEntryProps) => {
  return (
    <StyledPaper elevation={3}>
      <HeaderContainer>
        <CircularImage image="img/kinaxis.jpg" alt="Kinaxis" />
        <HeaderTextContainer>
          <Heading text={title} />
          <Subtitle text={subtitle} />
        </HeaderTextContainer>
      </HeaderContainer>
      <SkillsContainer>
        {skillItems.map((skill) => (
          <Chip key={skill.displayValue} {...skill} />
        ))}
      </SkillsContainer>
    </StyledPaper>
  );
};
