import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { AvatarText } from "../../text/AvatarText";
import { Chip } from "../../text/Chip";
import { Heading } from "../../text/Heading";
import { Paragraph } from "../../text/Paragraph";
import { Subtitle } from "../../text/Subtitle";

const StyledPaper = styled(Paper)`
  padding: 16px 12px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4px;
  width: 100%;
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 4px 16px;
  flex-grow: 1;
`;

const SubtitleContainer = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
  }
`;

const DateContainer = styled.div`
  margin-left: auto;
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  && > * {
    margin: 4px;
  }
`;

const DescriptionContainer = styled.div`
  padding: 4px 0 0 4px;
  display: flex;
  flex-direction: column;
  && > * {
    margin: 2px;
  }
`;

export type TimelineEntryProps = {
  title: string;
  initial: string;
  subtitle: string;
  skillItems: { icon?: JSX.Element; displayValue: string }[];
  description: string[];
  start: string;
  end: string;
};

export const TimelineEntry = ({
  title,
  initial,
  subtitle,
  skillItems,
  description,
  start,
  end,
}: TimelineEntryProps) => {
  return (
    <StyledPaper elevation={3}>
      <HeaderContainer>
        <AvatarText text={initial} />
        <HeaderTextContainer>
          <Heading text={title} />
          <SubtitleContainer>
            <Subtitle text={subtitle} />
            <DateContainer>
              <Subtitle text={`${start} - ${end}`} />
            </DateContainer>
          </SubtitleContainer>
        </HeaderTextContainer>
      </HeaderContainer>
      <SkillsContainer>
        {skillItems.map((skill) => (
          <Chip key={skill.displayValue} {...skill} />
        ))}
      </SkillsContainer>
      <DescriptionContainer>
        {description.map((item) => (
          <Paragraph key={item} text={`• ${item}`} />
        ))}
      </DescriptionContainer>
    </StyledPaper>
  );
};
