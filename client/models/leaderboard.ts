type GameResultData = {
  id: number;
  login: string;
  taipeirunnerscore: number;
};

type GameResult = {
  data: {
    login: string;
    taipeirunnerscore: number;
  };
};

type GameResultForAPI = GameResult & {
  ratingFieldName: "taipeirunnerscore";
};

type GetLeaderboardDataRequest = {
  ratingFieldName: "taipeirunnerscore";
  cursor: number;
  limit: number;
};

type GameResults = GameResult[];
type GameResultsData = GameResultData[];

export {
  GameResult,
  GameResultForAPI,
  GameResults,
  GameResultsData,
  GetLeaderboardDataRequest,
};
