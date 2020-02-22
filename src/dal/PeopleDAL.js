import { People } from "../app/models"

class PeopleDAL{

  async getUser(email) {
    try {
      return await People.findOne( { where: { email} } )
    } catch (error) { throw error }
  }

  async getUserById(id) {
    try {
      return await People.findByPk(id)
    } catch (error) { throw error }
  }

  async createUser(person) {
    try {
      return await People.create(person)
    } catch (error) { throw error }
  }

  async updateUser(user, _contextDb) {
      try {
        return await _contextDb.update(user)
      } catch (error) { throw error }
  }

  async deleteUser(userId, _contextDb) {
    try {
      return await _contextDb.destroy({ where: { id : userId } })
    } catch (error) { throw error }
  }

}

export default new PeopleDAL()
