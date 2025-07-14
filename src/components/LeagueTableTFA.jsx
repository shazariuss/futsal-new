import { useState } from "react";
// Пример пропса: leagueData = [{team:..., matches:..., wins:..., draws:..., loses:..., goalsFor:..., goalsAgainst:..., points:..., form: ['В','В','Н','П','В']}]
const tabs = [
    { value: "table", label: "ТАБЛИЦА" },
    { value: "chess", label: "ШАХМАТКА" },
    { value: "form", label: "ФОРМА" },
];

const getFormColor = (result) => {
    if (result === "В") return "bg-green-500";
    if (result === "Н") return "bg-blue-500";
    if (result === "П") return "bg-red-500";
    return "bg-gray-400";
};

const LeagueTableTFA = ({ leagueData, leagueName }) => {
    const [activeTab, setActiveTab] = useState("table");

    return (
        <div className="bg-white rounded-lg shadow-lg p-2 md:p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{leagueName}</h2>
            <div className="flex border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        className={`px-6 py-3 text-sm font-semibold ${
                            activeTab === tab.value
                                ? "border-b-4 border-blue-600 bg-gray-100"
                                : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab(tab.value)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {activeTab === "table" && (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-10 text-center font-normal">#</th>
                            <th className="text-left font-normal">КОМАНДА</th>
                            <th className="w-10 text-center font-normal">И</th>
                            <th className="w-10 text-center font-normal text-green-600">
                                В
                            </th>
                            <th className="w-10 text-center font-normal text-blue-600">
                                Н
                            </th>
                            <th className="w-10 text-center font-normal text-red-600">
                                П
                            </th>
                            <th className="w-16 text-center font-normal">
                                МЗ-МП
                            </th>
                            <th className="w-12 text-center font-normal">О</th>
                            <th className="w-36 text-center font-normal">
                                ФОРМА
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leagueData.map((team, idx) => (
                            <tr key={team.team} className="border-b">
                                <td className="text-center font-bold">
                                    {idx + 1}
                                </td>
                                <td className="flex items-center gap-2 py-2">
                                    {team.logo ? (
                                        <img
                                            src={team.logo}
                                            alt=""
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : null}
                                    {team.team}
                                </td>
                                <td className="text-center">{team.matches}</td>
                                <td className="text-center text-green-600 font-bold">
                                    {team.wins}
                                </td>
                                <td className="text-center text-blue-600 font-bold">
                                    {team.draws}
                                </td>
                                <td className="text-center text-red-600 font-bold">
                                    {team.loses}
                                </td>
                                <td className="text-center">
                                    {team.goalsFor} - {team.goalsAgainst}
                                </td>
                                <td className="text-center font-bold">
                                    {team.points}
                                </td>
                                <td className="text-center">
                                    <div className="flex gap-1 justify-center">
                                        {team.form.map((res, i) => (
                                            <span
                                                key={i}
                                                className={`px-2 py-1 rounded text-xs text-white font-bold ${getFormColor(
                                                    res
                                                )}`}
                                            >
                                                {res}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {activeTab === "form" && (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-10 text-center font-normal">#</th>
                            <th className="text-left font-normal">КОМАНДА</th>
                            <th className="w-36 text-center font-normal">
                                ФОРМА
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leagueData.map((team, idx) => (
                            <tr key={team.team} className="border-b">
                                <td className="text-center font-bold">
                                    {idx + 1}
                                </td>
                                <td className="flex items-center gap-2 py-2">
                                    {team.logo ? (
                                        <img
                                            src={team.logo}
                                            alt=""
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : null}
                                    {team.team}
                                </td>
                                <td className="text-center">
                                    <div className="flex gap-1 justify-center">
                                        {team.form.map((res, i) => (
                                            <span
                                                key={i}
                                                className={`px-2 py-1 rounded text-xs text-white font-bold ${getFormColor(
                                                    res
                                                )}`}
                                            >
                                                {res}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Можно реализовать шахматку аналогично */}
            {activeTab === "chess" && (
                <div className="p-8 text-center text-gray-400">
                    Шахматка в разработке
                </div>
            )}
        </div>
    );
};

export default LeagueTableTFA;
