export enum DeezerMethod {
  History = 'user/me/history',
  Album = 'album'
}

export type DeezerPaginationParams = {
  limit?: number;
  index?: number;
};
