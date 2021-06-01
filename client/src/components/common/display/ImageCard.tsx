import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { LinkTextButton } from "../forms/LinkTextButton";
import { Fragment } from "react";

type StyledCardProps = { $width: string };
const StyledCard = styled(Card)<StyledCardProps>`
  width: ${(props) => props.$width};
`;

type StyledCardMediaProps = { $height: number };
const StyledCardMedia = styled(CardMedia)<StyledCardMediaProps>`
  height: ${(props) => `${props.$height}px`};
`;

type LinkInfo = {
  link: string;
  isInternal: boolean;
  label: string;
};

type ImageCardProps = {
  image: string;
  title: string;
  description: string | string[];
  linkInfo?: LinkInfo;
  action?: JSX.Element;
  height: number;
  width: string;
};
export const ImageCard = ({
  image,
  title,
  description,
  linkInfo,
  action,
  height,
  width,
}: ImageCardProps) => {
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
        <StyledCardMedia image={image} title={title} $height={height} />
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
