import * as Yup from 'yup'
import { PeopleBLL } from "../../bll"

class PeopleController {

  async post(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    })

    try {
      if(!(await schema.isValid(req.body))) throw await schema.validate(req.body).catch(err => err.errors)

      const { id, name, email } = await PeopleBLL.createUser(req.body)
      return res.json({ userId : id, name, email })
    }
    catch (error) { res.status(400).json({ error }) }
  }

  async put(req, res) {
      const schema = Yup.object().shape({
        name: Yup.string(),
        oldPassword: Yup.string().min(6),
        password: Yup.string().min(6),
        email: Yup.string().email()
      })

      try {
        if(!(await schema.isValid(req.body))) throw await schema.validate(req.body).catch(err => err.errors)

        const { id, name, email} = await PeopleBLL.updateUser(req.body, req.userId)
        return res.json({ userId : id, name, email })
      }
      catch (error) { res.status(400).json({ error }) }
  }

  async delete(req, res) {
    try {
      return res.json(`${await PeopleBLL.deletarUsuario(req.userId)} deletado com sucesso!`)
    }
    catch (error) { res.status(400).json({ error }) }
  }

}

export default new PeopleController()
