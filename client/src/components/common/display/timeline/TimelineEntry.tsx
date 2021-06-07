import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { CircularImage } from "../../images/CircularImage";
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
`;

const HeaderTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 4px 16px;
`;

const DateContainer = styled.div`
  display: flex;
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
  image: string;
  subtitle: string;
  skillItems: { icon?: JSX.Element; displayValue: string }[];
  description: string[];
  start: string;
  end: string;
};

export const TimelineEntry = ({
  title,
  image,
  subtitle,
  skillItems,
  description,
  start,
  end,
}: TimelineEntryProps) => {
  return (
    <StyledPaper elevation={3}>
      <HeaderContainer>
        <CircularImage image={image} alt={title} />
        <HeaderTextContainer>
          <Heading text={title} />
          <Subtitle text={subtitle} />
        </HeaderTextContainer>
        <DateContainer>
          <Subtitle text={`${start} - ${end}`} />
        </DateContainer>
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
