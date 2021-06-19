import { ImageCard } from "../../common/display/ImageCard";

export const AboutMeCard = () => {
  return (
    <ImageCard
      height={500}
      width="100%"
      image="img/splash.jpg"
      imageDescription="Beach House - Osheaga 2019"
      title="About Me"
      description={[
        "I graduated with a degree in Computer Science from Carleton University in December 2020. Currently, I'm working as a software developer at Kinaxis, a supply chain management software company based in Kanata, Ontario. As a developer at Kinaxis, I leverage some of the latest technologies in web development on a daily basis.",
        "My greatest joy in software development is the production of full-stack web applications. I strive to learn everything I can about each level of the stack, especially in the contexts of designing MongoDB database schemas, building REST APIs with Node.js and Express, or constructing performant user interfaces with React.",
        "Outside of software development, I normally spend my time working out, listening to music, or watching movies.",
      ]}
    />
  );
};
