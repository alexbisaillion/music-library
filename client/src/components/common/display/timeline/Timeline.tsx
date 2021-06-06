import { Divider } from "@material-ui/core";
import styled from "styled-components";
import { TimelineEntry, TimelineEntryProps } from "./TimelineEntry";

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TimelineRow = styled.div`
  display: flex;
  width: 100%;
`;

const DividerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
`;

const TimelineEntryContainer = styled.div`
  display: flex;
  width: 90%;
  padding: 4px;
`;

type TimelineProps = {
  entries: TimelineEntryProps[];
};
export const Timeline = ({ entries }: TimelineProps) => {
  return (
    <TimelineContainer>
      {entries.map((entry) => (
        <TimelineRow key={entry.title}>
          <DividerContainer>
            <Divider orientation="vertical" />
          </DividerContainer>
          <TimelineEntryContainer>
            <TimelineEntry {...entry} />
          </TimelineEntryContainer>
        </TimelineRow>
      ))}
    </TimelineContainer>
  );
};
