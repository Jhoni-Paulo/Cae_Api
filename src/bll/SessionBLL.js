import { PeopleBLL } from "."
import authConfig from '../config/auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


class SessionBLL{

    async authenticateUser(email, password) {
        try {
            const person = await PeopleBLL.getUser(email)

            if(!person) throw "Usuário não encontrado"

            if(!password || !this._checkPassword(password, person.passwordHash)) throw "Senha inválida ou inexistente"

            const { id, name } = person

            return {
                user: {
                    userId : id,
                    name,
                    email
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                })
            }
        } catch (error) { throw error }
    }

    _checkPassword(password, passwordHash) { return bcrypt.compare(password, passwordHash) }

}

export default new SessionBLL()
