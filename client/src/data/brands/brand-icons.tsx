import {
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  JavaIcon,
  CSharpIcon,
  ReduxIcon,
  StyledComponentsIcon,
  MaterialUIIcon,
  JestIcon,
  MongoDBIcon,
  NodeJSIcon,
  NETIcon,
  SeleniumIcon,
} from "../../components/icons/external-icons";
import { Brand } from "./all-brands";

type BrandIcons = { [key in Brand]: JSX.Element };
export const availableBrandIcons: BrandIcons = {
  react: <ReactIcon />,
  typescript: <TypeScriptIcon />,
  javascript: <JavaScriptIcon />,
  java: <JavaIcon />,
  csharp: <CSharpIcon />,
  redux: <ReduxIcon />,
  styledcomponents: <StyledComponentsIcon />,
  materialui: <MaterialUIIcon />,
  jest: <JestIcon />,
  mongodb: <MongoDBIcon />,
  nodedotjs: <NodeJSIcon />,
  dotnet: <NETIcon />,
  selenium: <SeleniumIcon />,
};
