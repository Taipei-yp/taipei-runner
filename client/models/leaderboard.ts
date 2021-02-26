type GameResult = {
  data: {
    userName: string;
    taipeiscore: number;
  };
};

type GameResultForAPI = GameResult & {
  ratingFieldName: "taipeiscore";
};

type GetLeaderboardDataRequest = {
  ratingFieldName: "taipeiscore";
  cursor: number;
  limit: number;
};

type GameResults = GameResult[];

export { GameResultForAPI, GameResults, GetLeaderboardDataRequest };
