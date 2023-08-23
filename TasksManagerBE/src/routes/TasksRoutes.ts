import { Router } from 'express'
import * as controller from '../controllers/TasksController'
import { authCheckerMiddleware } from '../middlewares/auth';

const TasksRouter = Router(); 

TasksRouter.use(authCheckerMiddleware)

TasksRouter.post('/create', controller.CreateTask)
TasksRouter.get('/', controller.GetAllTasks)
TasksRouter.get('/user', controller.GetAllUserTasks)
TasksRouter.get('/project/:id', controller.GetAllProjectTasks)
TasksRouter.post('/date', controller.GetTaskByDate)
TasksRouter.get('/:id', controller.GetTaskById)
TasksRouter.patch('/:id', controller.UpdateTask)
TasksRouter.delete('/:id', controller.DeleteTask)

export default TasksRouter