import { api } from "client/api/api";
import {
  GameResultForAPI,
  GameResults,
  GetLeaderboardDataRequest,
} from "client/models/leaderboard";
import {
  GameResultForAPI as DevGameResultForAPI,
  GetLeaderboardDataRequest as DevGetLeaderboardDataRequest,
} from "client/models/leaderboard-dev";

const path = `/leaderboard`;
const { client } = api();

const pageSize = 10;

const devMappers = {
  toGameResultForAPI: (
    userName: string,
    score: number,
  ): DevGameResultForAPI => ({
    data: {
      userName,
      taipeidev: score,
    },
    ratingFieldName: "taipeidev",
  }),

  toGetLeaderboardDataRequest: (page = 0): DevGetLeaderboardDataRequest => ({
    ratingFieldName: "taipeidev",
    cursor: page * pageSize,
    limit: pageSize,
  }),
};

const prodMappers = {
  toGameResultForAPI: (userName: string, score: number): GameResultForAPI => ({
    data: {
      userName,
      taipeiscore: score,
    },
    ratingFieldName: "taipeiscore",
  }),

  toGetLeaderboardDataRequest: (page = 0): GetLeaderboardDataRequest => ({
    ratingFieldName: "taipeiscore",
    cursor: page * pageSize,
    limit: pageSize,
  }),
};

const isProd = process.env.NODE_ENV !== "production";
const mappers = isProd ? prodMappers : devMappers;

const leaderboardApi = () => {
  const saveScore = (userName: string, score: number) => {
    const data = mappers.toGameResultForAPI(userName, score);
    return client.post(`${path}`, data, {
      withCredentials: true,
    });
  };

  const get = (page = 0) => {
    const data = mappers.toGetLeaderboardDataRequest(page);
    return client.post<GameResults>(`${path}/all`, data, {
      withCredentials: true,
    });
  };

  return {
    saveScore,
    get,
  };
};

export { leaderboardApi };
