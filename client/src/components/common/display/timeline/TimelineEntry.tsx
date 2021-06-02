import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { CircularImage } from "../../images/CircularImage";
import { Heading } from "../../text/Heading";
import { Subtitle } from "../../text/Subtitle";

const StyledPaper = styled(Paper)`
  padding: 16px;
`;

export type TimelineEntryProps = {
  title: string;
  subtitle: string;
};

export const TimelineEntry = ({ title, subtitle }: TimelineEntryProps) => {
  return (
    <StyledPaper elevation={3}>
      <CircularImage image="img/kinaxis.jpg" alt="Kinaxis" />
      <Heading text={title} />
      <Subtitle text={subtitle} />
    </StyledPaper>
  );
};
