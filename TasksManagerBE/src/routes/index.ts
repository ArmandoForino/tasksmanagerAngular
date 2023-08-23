import { Router } from 'express'
import UsersRouter from './UsersRoutes'
import TasksRouter from './TasksRoutes'
import TagsRouter from './TagsRoutes'
import ProjectsRouter from './ProjectsRoutes'

const router = Router()

router.use('/users', UsersRouter)
router.use('/tasks', TasksRouter)
router.use('/tags', TagsRouter)
router.use('/projects', ProjectsRouter)

export default router