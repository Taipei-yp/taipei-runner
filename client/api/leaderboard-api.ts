import { api } from "client/api/api";
import {
  GameResultForAPI,
  GameResults,
  GetLeaderboardDataRequest,
} from "client/models/leaderboard";

const path = `/leaderboard`;
const { client } = api();

const pageSize = 10;

const toGameResultsData = (gameResults: GameResults) => {
  return gameResults.map((gr, key) => ({ ...gr.data, id: key }));
};

const toGameResultForAPI = (
  login: string,
  score: number,
): GameResultForAPI => ({
  data: {
    login,
    taipeirunnerscore: score,
  },
  ratingFieldName: "taipeirunnerscore",
});

const toGetLeaderboardDataRequest = (page = 0): GetLeaderboardDataRequest => ({
  ratingFieldName: "taipeirunnerscore",
  cursor: page * pageSize,
  limit: pageSize,
});

const leaderboardApi = () => {
  const saveScore = (login: string, score: number) => {
    const data = toGameResultForAPI(login, score);
    return client.post(`${path}`, data, {
      withCredentials: true,
    });
  };

  const get = (page = 0) => {
    const data = toGetLeaderboardDataRequest(page);
    return client
      .post<GameResults>(`${path}/all`, data, {
        withCredentials: true,
      })
      .then(gameResults => toGameResultsData(gameResults.data));
  };

  return {
    saveScore,
    get,
  };
};

export { leaderboardApi };
