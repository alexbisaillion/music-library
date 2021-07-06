# music-library

---

## Background

- This is a Node.js Express server that stores a data model of my music library, including artists, albums, tracks, and play history.
- It maps Spotify IDs to custom artist, album, and track Mongoose models, which make use of user-specified metadata. This can be useful for a few reasons, such as when:
  - Spotify defines undesired metadata on a particular release, such as a remastered or deluxe tag.
  - Spotify documents a particular release as multiple releases, where the releases should be treated as equivalent.
  - Spotify defines featured artists inconsistently.
- Scrobbling to Last.fm can then be executed based on the custom metadata, resulting in a cleaner Last.fm library.
