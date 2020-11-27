import { Router } from 'express';
import SessionsUsuariosController from '../app/controller/SessionsUsuariosController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req,res) => {
  try{
    const { email, password } = req.body;
    const sessionsUsuariosController = new SessionsUsuariosController();
    const { user, token } = await sessionsUsuariosController.store({
      email,
      password
    })

    let { id, nome, email:userMail, created_at, updated_at } = user;

    return res.json({ id, nome, email:userMail, created_at, updated_at, token });
  }catch(err){
    return res.status(400).json({ error: err.message });
  }
})


export default sessionsRouter;
