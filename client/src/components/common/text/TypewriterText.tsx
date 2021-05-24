import Typewriter from "typewriter-effect";

type TypewriterTextProps = { text: string[] | string };
export const TypewriterText = ({ text }: TypewriterTextProps) => {
  const wordList =
    typeof text === "string" ? [text] : text.map((word) => `${word} `);
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter.changeDelay(50);
        typewriter.start();
        for (const word of wordList) {
          typewriter.typeString(word).pauseFor(1000);
        }
      }}
    />
  );
};
