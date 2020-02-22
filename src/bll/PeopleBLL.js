import { PeopleDAL } from "../dal"
import { SessionBLL } from "."

class PeopleBLL{

  async getUser(email) {
    try {
      return await PeopleDAL.getUser(email)
    } catch (error) {
      throw error
    }
  }

  async _checkUser(email) {
    try { return (await PeopleDAL.getUser(email)) }
    catch (error) { return false }
  }

  async createUser(user) {
    try {
      if(await this._checkUser(user.email)) throw "Usuário já existe!"
      return await PeopleDAL.createUser(user)
    } catch (error) {
      throw error
    }
  }

  async updateUser(user, userId){
    try {
      const person = await PeopleDAL.getUserById(userId)

      if(!person) throw "Usuário não encontrado!"

      if(user.oldPassword && !SessionBLL._checkPassword(user.oldPassword, user.passwordHash))
        throw status(401).json({ error : "Senha inválida" })

      return await PeopleDAL.updateUser(user, person)

    } catch (error) {
      throw error
    }
  }

  async deleteUser(userId){
    try {
      const person = await PeopleDAL.getUserById(userId)

      if(!person) throw "Usuário não encontrado!"

      await PeopleDAL.deleteUser(userId, person)
      return person.email

    } catch (error) {
      throw error
    }
  }

}

export default new PeopleBLL()
