import axios from "axios";

const API_BASE_URL = "https://testapi.uzllf.uz/api/v1";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

// Home endpoints
export const homeApi = {
    getTournaments: () => api.get("/home/tournament_list/"),
    getLeagues: () => api.get("/home/leaguelist/"),
    getTeamsByLeague: (uuid) => api.get(`/home/teamsbyleague/${uuid}`),
    getLastMatches: () => api.get("/home/last10matches/"),
    getUpcomingMatches: () => api.get("/home/expec4matches/"),
    getPlayersByLeague: (uuid) => api.get(`/home/playerbyleague/${uuid}`),
    getAssistsByLeague: (uuid) => api.get(`/home/assistsbyleague/${uuid}`),
    getLapByLeague: (uuid) => api.get(`/home/lapbyleague/${uuid}`),
    getTopPlayers: (year = 2024) =>
        api.get(`/home/top_players_by_year/?year=${year}`),
    getPlayer: (uuid) => api.get(`/home/player/${uuid}`),
    getPlayerSeasons: (uuid) => api.get(`/home/player_seasons/${uuid}`),
    getPlayerTeams: (uuid) => api.get(`/home/player_teams/${uuid}`),
    getMatch: (uuid) => api.get(`/home/match/${uuid}`),
    getCoaches: () => api.get("/home/coach_list/"),
    getReferees: () => api.get("/home/referee_list/"),
    getLeague: (uuid) => api.get(`/home/get_league/${uuid}`),
    getPlayersByTeam: (uuid) => api.get(`/home/playerbyteam/${uuid}`),
};

// News endpoints
export const newsApi = {
    getLastNews: () => api.get("/news/last4news/"),
    getAllNews: (size = 10) => api.get(`/news/allnews/?size=${size}`),
    getNews: (uuid) => api.get(`/news/news/${uuid}`),
    getPhotos: (size = 12) => api.get(`/news/galery_photos/?size=${size}`),
    getVideos: (size = 12) => api.get(`/news/galery_videos/?size=${size}`),
    getLastMedia: () => api.get("/news/last5media/"),
    getPartners: () => api.get("/news/partners/"),
    getSocials: () => api.get("/news/socials/"),
    getAboutUs: () => api.get("/news/aboutus/"),
    getOrganizators: () => api.get("/news/organizator_list/"),
    createComment: (data) => api.post("/news/comment/", data),
};

export default api;
