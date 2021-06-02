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

type DummyContainerProps = { $pinLeft?: boolean };
const DummyContainer = styled.div<DummyContainerProps>`
  display: flex;
  width: 45%;
  justify-content: ${(props) => (props.$pinLeft ? "flex-start" : "flex-end")};
`;

const DividerContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
`;

type TimelineProps = {
  entries: TimelineEntryProps[];
};
export const Timeline = ({ entries }: TimelineProps) => {
  return (
    <TimelineContainer>
      {entries.map((entry, index) => (
        <TimelineRow key={entry.title}>
          {index % 2 === 0 ? (
            <DummyContainer />
          ) : (
            <DummyContainer key={entry.title}>
              <TimelineEntry {...entry} />
            </DummyContainer>
          )}
          <DividerContainer>
            <Divider orientation="vertical" />
          </DividerContainer>
          {index % 2 === 0 ? (
            <DummyContainer key={entry.title} $pinLeft>
              <TimelineEntry {...entry} />
            </DummyContainer>
          ) : (
            <DummyContainer />
          )}
        </TimelineRow>
      ))}
    </TimelineContainer>
  );
};
