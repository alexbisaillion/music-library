import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { LinkTextButton } from "../forms/LinkTextButton";
import { Fragment } from "react";

type StyledCardProps = { $width: string };
const StyledCard = styled(Card)<StyledCardProps>`
  width: ${(props) => props.$width};
`;

type LinkInfo = {
  link: string;
  isInternal: boolean;
  label: string;
};

type TextCardProps = {
  image: string;
  title: string;
  description: string | string[];
  linkInfo?: LinkInfo;
  action?: JSX.Element;
  width: string;
};
export const TextCard = ({
  title,
  description,
  linkInfo,
  action,
  width,
}: TextCardProps) => {
  const renderActions = () => {
    let actionContent: JSX.Element | undefined = undefined;
    if (linkInfo) {
      const { link, isInternal, label } = linkInfo;
      actionContent = (
        <LinkTextButton link={link} isInternal={isInternal} label={label} />
      );
    } else if (action) {
      actionContent = action;
    }

    if (!actionContent) {
      return <></>;
    }

    return <CardActions>{actionContent}</CardActions>;
  };

  const paragraphs =
    typeof description === "string" ? [description] : description;

  return (
    <StyledCard $width={width}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
          {paragraphs.map((paragraph, index) => (
            <Fragment key={paragraph}>
              <Typography
                key={paragraph}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {paragraph}
              </Typography>
              {index < paragraphs.length - 1 && <br />}
            </Fragment>
          ))}
        </CardContent>
      </CardActionArea>
      {renderActions()}
    </StyledCard>
  );
};
