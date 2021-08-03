import { Container, CssBaseline } from "@material-ui/core";
import { FunctionComponent } from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  padding-top: 60px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 8px;
  }
`;

export const PageContainer: FunctionComponent = ({ children }) => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <PageWrapper>{children}</PageWrapper>
    </Container>
  );
};
