import styled from "styled-components";
import { PageContainer } from "../common/Page";
import { Heading } from "../common/text/Heading";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 8px;
  }
`;

export const ErrorPage = () => {
  return (
    <PageContainer>
      <ErrorContainer>
        <Heading text="401: Unauthorized" />
      </ErrorContainer>
    </PageContainer>
  );
};
