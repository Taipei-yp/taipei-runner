type GameResult = {
  data: {
    login: string;
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

export { GameResult, GameResultForAPI, GameResults, GetLeaderboardDataRequest };
