import { Router } from 'express'
import * as controller from '../controllers/UsersController'

const UsersRouter = Router();


UsersRouter.get('/', controller.GetAllUsers)
UsersRouter.get('/:id', controller.GetUserById)
//UsersRouter.patch('/:id', controller.UpdateUser)
UsersRouter.delete('/:id', controller.DeleteUser)
UsersRouter.post('/refreshToken', controller.RefreshAccessToken)
UsersRouter.post('/create', controller.CreateUser)
UsersRouter.post('/login', controller.LoginUser)
UsersRouter.post('/logout', controller.LogoutUser)
UsersRouter.patch('/edit', controller.UpdateUser)

export default UsersRouter