import { Router } from 'express'
import * as controller from '../controllers/ProjectsController'
import { authCheckerMiddleware } from '../middlewares/auth';

const ProjectsRouter = Router(); 

ProjectsRouter.use(authCheckerMiddleware)

ProjectsRouter.post('/create', controller.CreateProject)
ProjectsRouter.get('/', controller.GetAllProjects)
ProjectsRouter.get('/user', controller.GetAllUserProjects)
ProjectsRouter.get('/status/:status', controller.GetProjectsByStatus) //active->true, inactive->false
ProjectsRouter.get('/:id', controller.GetProjectById)
ProjectsRouter.patch('/:id', controller.UpdateProject)
ProjectsRouter.delete('/:id', controller.DeleteProject)

export default ProjectsRouter