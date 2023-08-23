import { Router } from 'express'
import * as controller from '../controllers/TagsController'
import { authCheckerMiddleware } from '../middlewares/auth';

const TagsRouter = Router(); 

TagsRouter.use(authCheckerMiddleware)

TagsRouter.post('/create', controller.CreateTag)
TagsRouter.get('/', controller.GetAllTags)
TagsRouter.get('/user', controller.GetAllUserTags)
TagsRouter.get('/:id', controller.GetTagById)
TagsRouter.patch('/:id', controller.UpdateTag)
TagsRouter.delete('/:id', controller.DeleteTag)

export default TagsRouter