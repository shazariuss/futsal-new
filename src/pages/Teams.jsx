import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaEye, FaUsers, FaTrophy } from "react-icons/fa";
import { homeApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";
import { useNavigate } from "react-router-dom";

const Teams = () => {
    const [selectedLeague, setSelectedLeague] = useState("");
    const [selectedTeam, setSelectedTeam] = useState(null);
    const { language, getTranslation } = useLanguageStore();
    const navigate = useNavigate();

    const { data: leagues } = useQuery({
        queryKey: ["leagues"],
        queryFn: () => homeApi.getLeagues().then((res) => res.data),
    });

    const { data: teams } = useQuery({
        queryKey: ["teams", selectedLeague],
        queryFn: () =>
            homeApi.getTeamsByLeague(selectedLeague).then((res) => res.data),
        enabled: !!selectedLeague,
    });

    const { data: teamPlayers } = useQuery({
        queryKey: ["teamPlayers", selectedTeam],
        queryFn: () =>
            homeApi.getPlayersByTeam(selectedTeam).then((res) => res.data),
        enabled: !!selectedTeam,
    });

    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Page Header */}
                    <div className="tfa-container">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {language === "uz" && "Jamoalar"}
                            {language === "ru" && "Команды"}
                            {language === "en" && "Teams"}
                        </h1>

                        {/* League Selector */}
                        <div className="mb-6 pb-4 border-b border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {language === "uz" && "Ligani tanlang"}
                                {language === "ru" && "Выберите лигу"}
                                {language === "en" && "Select League"}
                            </label>
                            <select
                                value={selectedLeague}
                                onChange={(e) => {
                                    setSelectedLeague(e.target.value);
                                    setSelectedTeam(null);
                                }}
                                className="px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-purple-500"
                            >
                                <option value="">
                                    {language === "uz" && "Liga tanlang"}
                                    {language === "ru" && "Выберите лигу"}
                                    {language === "en" && "Select League"}
                                </option>
                                {leagues?.map((league) => (
                                    <option
                                        key={league.uuid}
                                        value={league.uuid}
                                    >
                                        {getTranslation(league)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedLeague && teams ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Teams Table */}
                            <div className="lg:col-span-2">
                                <div className="tfa-container">
                                    <h2 className="tfa-section-title">
                                        {getTranslation(teams, "league_name")} -
                                        {language === "uz" && " Turnir jadvali"}
                                        {language === "ru" &&
                                            " Турнирная таблица"}
                                        {language === "en" && " League Table"}
                                    </h2>

                                    <table className="tfa-table">
                                        <thead>
                                            <tr>
                                                <th className="w-12">#</th>
                                                <th>
                                                    {language === "uz" &&
                                                        "Jamoa"}
                                                    {language === "ru" &&
                                                        "Команда"}
                                                    {language === "en" &&
                                                        "Team"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    {language === "uz" && "O"}
                                                    {language === "ru" && "И"}
                                                    {language === "en" && "P"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    {language === "uz" && "G"}
                                                    {language === "ru" && "В"}
                                                    {language === "en" && "W"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    {language === "uz" && "D"}
                                                    {language === "ru" && "Н"}
                                                    {language === "en" && "D"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    {language === "uz" && "M"}
                                                    {language === "ru" && "П"}
                                                    {language === "en" && "L"}
                                                </th>
                                                <th className="w-16 text-center">
                                                    {language === "uz" && "G-M"}
                                                    {language === "ru" &&
                                                        "Мячи"}
                                                    {language === "en" && "GD"}
                                                </th>
                                                <th className="w-12 text-center">
                                                    {language === "uz" && "Och"}
                                                    {language === "ru" &&
                                                        "Очки"}
                                                    {language === "en" && "Pts"}
                                                </th>
                                                <th className="w-20"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teams.data?.map((team, index) => (
                                                <tr
                                                    key={team.uuid}
                                                    className={`cursor-pointer hover:bg-gray-50 ${
                                                        index === 0
                                                            ? "bg-green-50"
                                                            : index === 1
                                                            ? "bg-blue-50"
                                                            : index === 2
                                                            ? "bg-yellow-50"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedTeam(
                                                            team.uuid
                                                        )
                                                    }
                                                >
                                                    <td className="text-center font-bold">
                                                        <span
                                                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                                                                index === 0
                                                                    ? "bg-yellow-500 text-white"
                                                                    : index ===
                                                                      1
                                                                    ? "bg-gray-400 text-white"
                                                                    : index ===
                                                                      2
                                                                    ? "bg-orange-500 text-white"
                                                                    : "bg-gray-200 text-gray-700"
                                                            }`}
                                                        >
                                                            {index + 1}
                                                        </span>
                                                    </td>
                                                    <td className="team-name">
                                                        {getTranslation(team)}
                                                    </td>
                                                    <td className="text-center">
                                                        {team.data?.matches ||
                                                            0}
                                                    </td>
                                                    <td className="text-center text-green-600 font-medium">
                                                        {team.data?.wins || 0}
                                                    </td>
                                                    <td className="text-center text-yellow-600 font-medium">
                                                        {team.data?.draws || 0}
                                                    </td>
                                                    <td className="text-center text-red-600 font-medium">
                                                        {team.data?.loses || 0}
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="text-green-600 font-medium">
                                                            {team.data
                                                                ?.my_goals || 0}
                                                        </span>
                                                        <span className="text-gray-400 mx-1">
                                                            -
                                                        </span>
                                                        <span className="text-red-600 font-medium">
                                                            {team.data
                                                                ?.your_goals ||
                                                                0}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">
                                                            {team.data
                                                                ?.points || 0}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(
                                                                    `/teams/${team.uuid}`
                                                                );
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            <FaEye />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Team Details Sidebar */}
                            <div>
                                {selectedTeam && teamPlayers ? (
                                    <div className="tfa-sidebar">
                                        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                            {language === "uz" &&
                                                "Jamoa tarkibi"}
                                            {language === "ru" &&
                                                "Состав команды"}
                                            {language === "en" && "Team Squad"}
                                        </h3>

                                        <div className="space-y-4">
                                            {/* Team Info */}
                                            <div className="bg-gray-50 rounded p-3">
                                                <h4 className="font-bold text-gray-900 mb-1">
                                                    {getTranslation(
                                                        teamPlayers
                                                    )}
                                                </h4>
                                                {teamPlayers.coach && (
                                                    <p className="text-sm text-gray-600">
                                                        {language === "uz" &&
                                                            "Murabbiy: "}
                                                        {language === "ru" &&
                                                            "Тренер: "}
                                                        {language === "en" &&
                                                            "Coach: "}
                                                        {getTranslation(
                                                            teamPlayers.coach
                                                        )}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-600">
                                                    {language === "uz" &&
                                                        "O'yinchilar: "}
                                                    {language === "ru" &&
                                                        "Игроки: "}
                                                    {language === "en" &&
                                                        "Players: "}
                                                    {teamPlayers.players
                                                        ?.count || 0}
                                                </p>
                                            </div>

                                            {/* Top Players */}
                                            {teamPlayers.players?.data?.length >
                                                0 && (
                                                <div>
                                                    <h5 className="font-medium text-gray-800 text-sm mb-2">
                                                        {language === "uz" &&
                                                            "Asosiy o'yinchilar"}
                                                        {language === "ru" &&
                                                            "Основные игроки"}
                                                        {language === "en" &&
                                                            "Key Players"}
                                                    </h5>
                                                    <div className="space-y-2">
                                                        {teamPlayers.players.data
                                                            .slice(0, 5)
                                                            .map((player) => (
                                                                <div
                                                                    key={
                                                                        player.uuid
                                                                    }
                                                                    className="flex items-center justify-between text-sm"
                                                                >
                                                                    <div className="flex items-center space-x-2">
                                                                        <span className="w-6 h-6 bg-purple-600 text-white rounded text-xs flex items-center justify-center font-medium">
                                                                            {
                                                                                player.number
                                                                            }
                                                                        </span>
                                                                        <span className="text-gray-900">
                                                                            {getTranslation(
                                                                                player
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-green-600 font-medium">
                                                                        {player
                                                                            .events
                                                                            ?.goals ||
                                                                            0}
                                                                        ⚽
                                                                    </span>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="tfa-sidebar">
                                        <h3 className="font-bold text-gray-800 mb-4 text-sm uppercase">
                                            {language === "uz" &&
                                                "Jamoa tafsilotlari"}
                                            {language === "ru" &&
                                                "Детали команды"}
                                            {language === "en" &&
                                                "Team Details"}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            {language === "uz" &&
                                                "Tafsilotlarni ko'rish uchun jamoani tanlang"}
                                            {language === "ru" &&
                                                "Выберите команду для просмотра деталей"}
                                            {language === "en" &&
                                                "Select a team to view details"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="tfa-container">
                            <div className="text-center py-12">
                                <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    {language === "uz" && "Ligani tanlang"}
                                    {language === "ru" && "Выберите лигу"}
                                    {language === "en" && "Select a League"}
                                </h3>
                                <p className="text-gray-500">
                                    {language === "uz" &&
                                        "Jamoalar ro'yxatini ko'rish uchun ligani tanlang"}
                                    {language === "ru" &&
                                        "Выберите лигу для просмотра команд"}
                                    {language === "en" &&
                                        "Choose a league to view teams"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teams;
