import styled from "styled-components";
import { availableBrands } from "../../data/brands/brands";
import { Timeline } from "../common/display/timeline/Timeline";
import { PageContainer } from "../common/Page";

const ProjectsContainer = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  && > * {
    margin: 16px;
  }
`;

export const Projects = () => {
  return (
    <PageContainer>
      <ProjectsContainer>
        <Timeline
          entries={[
            {
              title: "Spotify Scrobble Proxy",
              initial: "S",
              subtitle:
                "A customized Last.fm scrobbler based on the Spotify API.",
              skillItems: [
                availableBrands.typescript,
                availableBrands.nodedotjs,
                availableBrands.mongodb,
                availableBrands.react,
                availableBrands.materialui,
                availableBrands.styledcomponents,
              ],
              description: [
                "A Node.js Express server that reads music listening activity from the Spotify API and registers it on Last.fm using the Last.fm API.",
                "Uses Heroku scheduled tasks to regularly pull from the Spotify API and post to the Last.fm API.",
                "Track metadata is stored on a MongoDB instance hosted on MongoDB Atlas, which enables customized user specified metadata.",
                "A minimal React client allows registration of new track metadata and modification of existing track metadata.",
              ],
              start: "January 2020",
              end: "March 2020",
            },
            {
              title: "ProjectConnect",
              initial: "P",
              subtitle: "A web-based project recommender system.",
              skillItems: [
                availableBrands.typescript,
                availableBrands.nodedotjs,
                availableBrands.mongodb,
                availableBrands.react,
                availableBrands.materialui,
                availableBrands.styledcomponents,
              ],
              description: [
                "A web-based recommender system that intends to help software developers recruit for projects and find projects to participate in.",
                "Developed on a full MERN stack and deployed to the web with Heroku.",
                "Implemented a recommender algorithm to find ideal project recommendations using principles of machine learning.",
                "Used content-based filtering and one-hot encoding to evaluate the similarity between user and project schema instances.",
                "All user and project data is saved in persistent storage via a MongoDB instance hosted on MongoDB Atlas.",
                "Built a functional registration and log-in system to enable sustained use of the application.",
                "Client features included project creation, requests and invitations enabled with a notification system, and skill voting.",
              ],
              start: "September 2020",
              end: "December 2020",
            },
            {
              title: "Split Scrobble Finder",
              initial: "S",
              subtitle:
                "A web app that finds split scrobbles in a user's Last.fm library.",
              skillItems: [
                availableBrands.javascript,
                availableBrands.nodedotjs,
                availableBrands.react,
                availableBrands.materialui,
                availableBrands.jest,
              ],
              description: [
                "A web app that scans your Last.fm profile for split scrobbles, otherwise known as plays, which can arise when streaming services change the metadata of a track, album or artist.",
                "Built on a Node.js Express server that is responsible for making authenticated calls to the Last.fm API.",
                "The server serves a React client, written in JavaScript with Material-UI components, that allows users to make queries and view or save their results.",
                "The application, served on Heroku and registered with Google Analytics, received over 1000 hits in its first month of deployment.",
              ],
              start: "December 2019",
              end: "June 2020",
            },
            {
              title: "Personal Website: V1",
              initial: "P",
              subtitle: "The first iteration of my personal website.",
              skillItems: [
                availableBrands.javascript,
                availableBrands.nodedotjs,
                availableBrands.react,
              ],
              description: [
                "My first foray into client-side web development, intended as a an opportunity to learn React.",
                "Used previous experience with server-side Node.js web development to build an Express server.",
                "The Express server was used to make requests to the Spotify API, which the React client used to display my Spotify music listening statistics and activities.",
                "Built the client from the ground up, without depending extensively on external component libraries, as means to gain a solid foundation in React development.",
                "The website extensively used CSS3 features, including flexboxes, grids, and gradients, as well as aspects of HTML5, such as inline SVG images.",
                "Modern JavaScript features used in the website included classes, anonymous functions, and arrow functions.",
              ],
              start: "January 2019",
              end: "November 2019",
            },
            {
              title: "Local Music Manager",
              initial: "L",
              subtitle: "A tool to help manage an iTunes music library.",
              skillItems: [
                availableBrands.java,
                availableBrands.javafx,
                availableBrands.python,
              ],
              description: [
                "A JavaFX desktop client that manages a music library, handling archive extraction, file tagging, and file I/O in Java.",
                "It allows for archive and audio files to be sorted into a music library, added to iTunes, and converted into MP3 and AAC format via iTunes",
                "It also handles moving the converted files around the local file system.",
                "It Communicates with the iTunes COM interface using Python scripts.",
              ],
              start: "May 2018",
              end: "October 2018",
            },
          ]}
        />
      </ProjectsContainer>
    </PageContainer>
  );
};
