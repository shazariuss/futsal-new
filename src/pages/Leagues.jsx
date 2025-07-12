import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaTrophy, FaUsers, FaChartLine, FaMedal } from 'react-icons/fa'
import { homeApi } from '../services/api'
import { useLanguageStore } from '../store/languageStore'
import TeamCard from '../components/TeamCard'
import PlayerCard from '../components/PlayerCard'
import Loading from '../components/Loading'

const Leagues = () => {
  const { id } = useParams()
  const { language, getTranslation } = useLanguageStore()

  const { data: league, isLoading: leagueLoading } = useQuery({
    queryKey: ['league', id],
    queryFn: () => homeApi.getLeague(id).then(res => res.data),
    enabled: !!id
  })

  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams', id],
    queryFn: () => homeApi.getTeamsByLeague(id).then(res => res.data),
    enabled: !!id
  })

  const { data: topScorers, isLoading: scorersLoading } = useQuery({
    queryKey: ['topScorers', id],
    queryFn: () => homeApi.getPlayersByLeague(id).then(res => res.data),
    enabled: !!id
  })

  const { data: topAssists, isLoading: assistsLoading } = useQuery({
    queryKey: ['topAssists', id],
    queryFn: () => homeApi.getAssistsByLeague(id).then(res => res.data),
    enabled: !!id
  })

  const tabTitles = {
    uz: {
      table: 'Turnir jadvali',
      scorers: 'Eng ko\'p gol urarlar',
      assists: 'Eng ko\'p uzatmarlar'
    },
    ru: {
      table: 'Турнирная таблица',
      scorers: 'Лучшие бомбардиры',
      assists: 'Лучшие ассистенты'
    },
    en: {
      table: 'League Table',
      scorers: 'Top Scorers',
      assists: 'Top Assists'
    }
  }

  const tableHeaders = {
    uz: {
      position: 'O\'rin',
      team: 'Jamoa',
      matches: 'O\'yinlar',
      wins: 'G\'alabalar',
      draws: 'Duranglar',
      losses: 'Mag\'lubiyatlar',
      goals: 'Gollar',
      points: 'Ochkolar'
    },
    ru: {
      position: 'Место',
      team: 'Команда',
      matches: 'Матчи',
      wins: 'Победы',
      draws: 'Ничьи',
      losses: 'Поражения',
      goals: 'Голы',
      points: 'Очки'
    },
    en: {
      position: 'Pos',
      team: 'Team',
      matches: 'MP',
      wins: 'W',
      draws: 'D',
      losses: 'L',
      goals: 'GF',
      points: 'Pts'
    }
  }

  if (leagueLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* League Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-4 mb-4"
          >
            {league?.icon && (
              <img 
                src={league.icon} 
                alt={getTranslation(league)}
                className="w-16 h-16 object-cover rounded-full"
              />
            )}
            <h1 className="text-4xl font-bold text-gray-900">
              {getTranslation(league)}
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {teams?.league_name_uz && getTranslation(teams, 'league_name')}
          </motion.p>
        </div>

        {/* League Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card text-center"
          >
            <div className="card-content">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-primary-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {teams?.data?.length || 0}
              </h3>
              <p className="text-gray-600">
                {language === 'uz' && 'Jamoalar'}
                {language === 'ru' && 'Команды'}
                {language === 'en' && 'Teams'}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card text-center"
          >
            <div className="card-content">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTrophy className="text-green-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {teams?.data?.reduce((total, team) => total + (team.data?.matches || 0), 0) || 0}
              </h3>
              <p className="text-gray-600">
                {language === 'uz' && 'O\'yinlar'}
                {language === 'ru' && 'Матчи'}
                {language === 'en' && 'Matches'}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card text-center"
          >
            <div className="card-content">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaChartLine className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {teams?.data?.reduce((total, team) => total + (team.data?.my_goals || 0), 0) || 0}
              </h3>
              <p className="text-gray-600">
                {language === 'uz' && 'Gollar'}
                {language === 'ru' && 'Голы'}
                {language === 'en' && 'Goals'}
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card text-center"
          >
            <div className="card-content">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaMedal className="text-purple-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">2024</h3>
              <p className="text-gray-600">
                {language === 'uz' && 'Mavsum'}
                {language === 'ru' && 'Сезон'}
                {language === 'en' && 'Season'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* League Table */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            {tabTitles[language].table}
          </motion.h2>
          
          {teamsLoading ? (
            <Loading />
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].position}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].team}
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].matches}
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].wins}
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].draws}
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].losses}
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].goals}
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {tableHeaders[language].points}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {teams?.data?.map((team, index) => (
                      <motion.tr 
                        key={team.uuid}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 
                            index === 2 ? 'bg-orange-500' : 
                            'bg-gray-300 text-gray-700'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                              {team.icon ? (
                                <img 
                                  src={team.icon} 
                                  alt={getTranslation(team)}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-bold text-gray-600">
                                  {getTranslation(team).slice(0, 2)}
                                </span>
                              )}
                            </div>
                            <span className="font-medium text-gray-900">
                              {getTranslation(team)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          {team.data?.matches || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">
                          {team.data?.wins || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">
                          {team.data?.draws || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">
                          {team.data?.loses || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                          <span className="text-green-600 font-medium">{team.data?.my_goals || 0}</span>
                          <span className="text-gray-400 mx-1">:</span>
                          <span className="text-red-600 font-medium">{team.data?.your_goals || 0}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {team.data?.points || 0}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Top Scorers and Assists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Scorers */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              {tabTitles[language].scorers}
            </motion.h2>
            
            {scorersLoading ? (
              <Loading />
            ) : (
              <div className="space-y-4">
                {topScorers?.slice(0, 5).map((player, index) => (
                  <PlayerCard key={player.uuid} player={player} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Top Assists */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              {tabTitles[language].assists}
            </motion.h2>
            
            {assistsLoading ? (
              <Loading />
            ) : (
              <div className="space-y-4">
                {topAssists?.slice(0, 5).map((player, index) => (
                  <PlayerCard key={player.uuid} player={player} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leagues