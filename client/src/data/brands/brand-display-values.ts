import { Brand } from "./all-brands";

type BrandDisplayValues = { [key in Brand]: string };
export const availableBrandDisplayValues: BrandDisplayValues = {
  react: "React",
  typescript: "TypeScript",
  javascript: "JavaScript",
  java: "Java",
  csharp: "C#",
  redux: "Redux",
  styledcomponents: "styled-components",
  materialui: "Material-UI",
  jest: "Jest",
  mongodb: "MongoDB",
  nodedotjs: "Node.js",
  dotnet: ".NET",
  selenium: "Selenium",
  python: "Python",
  axios: "Axios",
  javafx: "JavaFX",
  swing: "Swing",
};
