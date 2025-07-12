import { motion } from 'framer-motion'
import { FaTrophy, FaUsers, FaChartLine } from 'react-icons/fa'
import { useLanguageStore } from '../store/languageStore'

const TeamCard = ({ team, index = 0 }) => {
  const { language, getTranslation } = useLanguageStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="tfa-card hover:scale-105 transition-transform duration-300"
    >
      <div className="card-content">
        {/* Team Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center overflow-hidden border-2 border-primary-200">
            {team.icon ? (
              <img 
                src={team.icon} 
                alt={getTranslation(team)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-primary-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {getTranslation(team).slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900">
              {getTranslation(team)}
            </h3>
            {team.coach && (
              <p className="text-sm text-primary-600">
                {language === 'uz' && 'Murabbiy: '}
                {language === 'ru' && 'Тренер: '}
                {language === 'en' && 'Coach: '}
                {getTranslation(team.coach)}
              </p>
            )}
          </div>
        </div>

        {/* Team Stats */}
        {team.data && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mx-auto mb-2">
                <FaTrophy className="text-yellow-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">{team.data.points}</div>
              <div className="text-xs text-gray-500">
                {language === 'uz' && 'Ochko'}
                {language === 'ru' && 'Очки'}
                {language === 'en' && 'Points'}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mx-auto mb-2">
                <FaUsers className="text-primary-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">{team.data.matches}</div>
              <div className="text-xs text-gray-500">
                {language === 'uz' && 'O\'yinlar'}
                {language === 'ru' && 'Матчи'}
                {language === 'en' && 'Matches'}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mx-auto mb-2">
                <FaChartLine className="text-green-600" />
              </div>
              <div className="text-lg font-bold text-gray-900">{team.data.my_goals}</div>
              <div className="text-xs text-gray-500">
                {language === 'uz' && 'Gollar'}
                {language === 'ru' && 'Голы'}
                {language === 'en' && 'Goals'}
              </div>
            </div>
          </div>
        )}

        {/* Win/Draw/Loss */}
        {team.data && (
          <div className="flex justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">
                {language === 'uz' && 'G\'alabalar: '}
                {language === 'ru' && 'Победы: '}
                {language === 'en' && 'Wins: '}
                {team.data.wins}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">
                {language === 'uz' && 'Durang: '}
                {language === 'ru' && 'Ничьи: '}
                {language === 'en' && 'Draws: '}
                {team.data.draws}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">
                {language === 'uz' && 'Mag\'lubiyatlar: '}
                {language === 'ru' && 'Поражения: '}
                {language === 'en' && 'Losses: '}
                {team.data.loses}
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TeamCard