import { Container, CssBaseline } from '@material-ui/core';

export const PageContainer = (props: { children: React.ReactNode }) => {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {props.children}
    </Container>
  );
};
