'use strict'

require('dotenv').config({ path: `${ process.cwd() }/.env` })

const { Sequelize, DataTypes } = require('sequelize')

const env = process.env.NODE_ENV || 'dev'

const dialectOptions = env === 'dev' ? {  } : {
    ssl: {
        require: true,
        rejectUnauthorized: false
    },
    useUTC: false,
    tiezone: '+08:00'
}

const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: env === 'dev' ? true : false,
        dialectOptions
    }
)
    
// Import models
const models = [
    require('./models/candidate.js'), require('./models/event.js'), require('./models/user.js')
]

// Init model
for (const model of models) model(sequelize, DataTypes)

// Parsing models
const { Candidate, User } = sequelize.models

// Define accociate
Candidate.hasMany(User, { foreignKey: 'id' ,as: 'candidate_id' })
User.belongsTo(Candidate, { foreignKey: 'candidate_id' })

module.exports = sequelize