import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTrophy, FaEye } from "react-icons/fa";
import { homeApi } from "../services/api";
import { useLanguageStore } from "../store/languageStore";

const Tournaments = () => {
    const { language, getTranslation } = useLanguageStore();

    const { data: tournaments } = useQuery({
        queryKey: ["tournaments"],
        queryFn: () => homeApi.getTournaments().then((res) => res.data),
    });

    const { data: leagues } = useQuery({
        queryKey: ["leagues"],
        queryFn: () => homeApi.getLeagues().then((res) => res.data),
    });

    return (
        <div className="tfa-layout">
            <div className="tfa-main-content">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Page Header */}
                    <div className="tfa-container">
                        <h1 className="text-2xl font-bold text-gray-800 mb-6">
                            {language === "uz" && "Turnirlar va ligalar"}
                            {language === "ru" && "Турниры и лиги"}
                            {language === "en" && "Tournaments and Leagues"}
                        </h1>
                    </div>

                    {/* Tournaments Table */}
                    <div className="tfa-container">
                        <h2 className="tfa-section-title">
                            {language === "uz" && "Barcha turnirlar"}
                            {language === "ru" && "Все турниры"}
                            {language === "en" && "All Tournaments"}
                        </h2>

                        <table className="tfa-table">
                            <thead>
                                <tr>
                                    <th className="w-12">#</th>
                                    <th>
                                        {language === "uz" && "Turnir nomi"}
                                        {language === "ru" &&
                                            "Название турнира"}
                                        {language === "en" && "Tournament Name"}
                                    </th>
                                    <th className="w-20">
                                        {language === "uz" && "Ligalar soni"}
                                        {language === "ru" && "Количество лиг"}
                                        {language === "en" && "Leagues Count"}
                                    </th>
                                    <th>
                                        {language === "uz" && "Ligalar"}
                                        {language === "ru" && "Лиги"}
                                        {language === "en" && "Leagues"}
                                    </th>
                                    <th className="w-20">
                                        {language === "uz" && "Amallar"}
                                        {language === "ru" && "Действия"}
                                        {language === "en" && "Actions"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournaments?.map((tournament, index) => {
                                    const tournamentLeagues = leagues?.filter(
                                        (league) =>
                                            league.tournament ===
                                            tournament.uuid
                                    );

                                    return (
                                        <tr
                                            key={tournament.uuid}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="text-center">
                                                <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-600 rounded-full text-sm font-bold">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="team-name">
                                                <div className="flex items-center space-x-3">
                                                    <FaTrophy className="text-purple-600" />
                                                    <span className="font-medium">
                                                        {getTranslation(
                                                            tournament
                                                        )}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">
                                                    {tournamentLeagues?.length ||
                                                        0}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="space-y-1">
                                                    {tournamentLeagues
                                                        ?.slice(0, 3)
                                                        .map((league) => (
                                                            <Link
                                                                key={
                                                                    league.uuid
                                                                }
                                                                to={`/leagues/${league.uuid}`}
                                                                className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                                            >
                                                                {getTranslation(
                                                                    league
                                                                )}
                                                            </Link>
                                                        ))}
                                                    {tournamentLeagues?.length >
                                                        10 && (
                                                        <span className="text-xs text-gray-500">
                                                            +
                                                            {tournamentLeagues.length -
                                                                3}{" "}
                                                            {language === "uz"
                                                                ? "ta ko'proq"
                                                                : language ===
                                                                  "ru"
                                                                ? "еще"
                                                                : "more"}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                                    <FaEye />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Leagues Table */}
                    <div className="tfa-container">
                        <h2 className="tfa-section-title">
                            {language === "uz" && "Barcha ligalar"}
                            {language === "ru" && "Все лиги"}
                            {language === "en" && "All Leagues"}
                        </h2>

                        <table className="tfa-table">
                            <thead>
                                <tr>
                                    <th className="w-12">#</th>
                                    <th>
                                        {language === "uz" && "Liga nomi"}
                                        {language === "ru" && "Название лиги"}
                                        {language === "en" && "League Name"}
                                    </th>
                                    <th>
                                        {language === "uz" && "Turnir"}
                                        {language === "ru" && "Турнир"}
                                        {language === "en" && "Tournament"}
                                    </th>
                                    <th className="w-20">
                                        {language === "uz" && "Holat"}
                                        {language === "ru" && "Статус"}
                                        {language === "en" && "Status"}
                                    </th>
                                    <th className="w-20">
                                        {language === "uz" && "Amallar"}
                                        {language === "ru" && "Действия"}
                                        {language === "en" && "Actions"}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {leagues?.map((league, index) => {
                                    const tournament = tournaments?.find(
                                        (t) => t.uuid === league.tournament
                                    );

                                    return (
                                        <tr
                                            key={league.uuid}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="text-center font-medium">
                                                {index + 1}
                                            </td>
                                            <td className="team-name">
                                                <div className="flex items-center space-x-2">
                                                    {league.icon && (
                                                        <img
                                                            src={league.icon}
                                                            alt={getTranslation(
                                                                league
                                                            )}
                                                            className="w-6 h-6 object-cover rounded"
                                                        />
                                                    )}
                                                    <span>
                                                        {getTranslation(league)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-sm text-gray-600">
                                                {tournament
                                                    ? getTranslation(tournament)
                                                    : "-"}
                                            </td>
                                            <td>
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                                    {language === "uz" &&
                                                        "Faol"}
                                                    {language === "ru" &&
                                                        "Активная"}
                                                    {language === "en" &&
                                                        "Active"}
                                                </span>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/leagues/${league.uuid}`}
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    <FaEye />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tournaments;
