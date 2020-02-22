import Sequelize from 'sequelize'
import { People } from '../app/models'

import databaseConfig from '../config/database'

const models = [People]

class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)

        models.map(model => model.init(this.connection))
    }
}

export default new Database()
