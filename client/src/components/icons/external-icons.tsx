import { SvgIcon } from "@material-ui/core";
import { ReactComponent as CSharp } from "./svg/csharp.svg";
import { ReactComponent as NET } from "./svg/dotnet.svg";
import { ReactComponent as Java } from "./svg/java.svg";
import { ReactComponent as JavaScript } from "./svg/javascript.svg";
import { ReactComponent as Jest } from "./svg/jest.svg";
import { ReactComponent as MaterialUI } from "./svg/materialui.svg";
import { ReactComponent as MongoDB } from "./svg/mongodb.svg";
import { ReactComponent as NodeJS } from "./svg/nodedotjs.svg";
import { ReactComponent as React } from "./svg/react.svg";
import { ReactComponent as Redux } from "./svg/redux.svg";
import { ReactComponent as Selenium } from "./svg/selenium.svg";
import { ReactComponent as StyledComponents } from "./svg/styledcomponents.svg";
import { ReactComponent as TypeScript } from "./svg/typescript.svg";

type ExternalIconProps = { icon: JSX.Element };
const ExternalIcon = ({ icon }: ExternalIconProps) => <SvgIcon>{icon}</SvgIcon>;

export const CSharpIcon = () => <ExternalIcon icon={<CSharp />} />;
export const NETIcon = () => <ExternalIcon icon={<NET />} />;
export const JavaIcon = () => <ExternalIcon icon={<Java />} />;
export const JavaScriptIcon = () => <ExternalIcon icon={<JavaScript />} />;
export const JestIcon = () => <ExternalIcon icon={<Jest />} />;
export const MaterialUIIcon = () => <ExternalIcon icon={<MaterialUI />} />;
export const MongoDBIcon = () => <ExternalIcon icon={<MongoDB />} />;
export const NodeJSIcon = () => <ExternalIcon icon={<NodeJS />} />;
export const ReactIcon = () => <ExternalIcon icon={<React />} />;
export const ReduxIcon = () => <ExternalIcon icon={<Redux />} />;
export const SeleniumIcon = () => <ExternalIcon icon={<Selenium />} />;
export const StyledComponentsIcon = () => (
  <ExternalIcon icon={<StyledComponents />} />
);
export const TypeScriptIcon = () => <ExternalIcon icon={<TypeScript />} />;
