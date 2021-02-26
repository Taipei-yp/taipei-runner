type GameResult = {
  data: {
    login: string;
    taipeidev: number;
  };
};

type GameResultForAPI = GameResult & {
  ratingFieldName: "taipeidev";
};

type GetLeaderboardDataRequest = {
  ratingFieldName: "taipeidev";
  cursor: number;
  limit: number;
};

export { GameResultForAPI, GetLeaderboardDataRequest };
