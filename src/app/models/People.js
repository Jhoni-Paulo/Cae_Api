import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class People extends Model{
    static init(sequelize) {
        super.init(
        {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            passwordHash: Sequelize.STRING,
            role: {
              type: Sequelize.STRING,
              defaultValue: "USR"
            }
        },
        {
            sequelize
        })

        this.addHook('beforeSave', async (people) => {
            if (people.password) people.passwordHash = await bcrypt.hash(people.password, 12)
        })
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.passwordHash)
    }
}

export default People
