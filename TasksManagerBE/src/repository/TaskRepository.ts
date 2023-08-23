import { Project, Tag, Task, User } from '../models'
import { TaskInput, TaskOutput } from '../utils/interfaces/TaskInterface'
import sequelize from "../database/connection";

export const create = async (payload: TaskInput, userId: number): Promise<TaskOutput> => {
    const task = await Task.create(payload)
    // associo l'utente che ha creato la nota
    await task.setUser(userId);
    await task.setProject(payload.project);
    
    if(payload.tagsList) {
        await task.setTags(payload.tagsList);
    }

    return task;
}

// Non uso
export const getAll = async (): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
    });
    return tasks;
}

export const getById = async (id: number, userId: number): Promise<TaskOutput> => {
    const task = await Task.findOne({
        where: {
            id: id
        },
        include: [
            { model: Tag},
            { model: Project },
            {
                model: User,
                where: {
                    id : userId
                }
            }
        ]
    })
    if (!task) {
        throw new Error('Task non trovato')
    }
    return task;
}

export const getAllByUserId = async (id: number): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        include: [
            { model: Tag },
            { model: Project,
                where: {
                    status: true
                }
            },
            {
                model: User,
                where: {
                    id : id
                }
            }
        ]
    })
    
    return tasks;
}

export const getAllByProjectId = async (userId: number, id: number): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        include: [
            { model: Tag },
            { 
                model: Project,
                where: {
                    id : id
                }
            },
            {
                model: User,
                where: {
                    id : userId
                }
            }
        ]
    })
    
    return tasks;
}

export const getAllByDate = async (userId: number, date: Date): Promise<TaskOutput[]> => {
    const tasks = await Task.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        where: {
            dueDate: date, 
        },
        include: [
            { model: Tag },
            { model: Project,
                where: {
                    status: true
                } 
            },
            {
                model: User,
                where: {
                    id : userId
                }
            }
        ]
    })
    if (!tasks) {
        throw new Error('Task non trovato')
    }
    return tasks;
}

export const update = async (id: number, payload: Partial<TaskInput>): Promise<TaskOutput> => {
    const task = await Task.findByPk(id)
    console.log(payload)
    if (!task) {
        throw new Error('Task non trovato')
    }

    await task.setProject(payload.project);
    
    if(payload.tagsList) {
        await task.setTags(payload.tagsList);
    }

    const updatedTask = await task.update(payload)
    
    return updatedTask;
}

export const deleteById = async (id: number, userId: number): Promise<TaskOutput> => {
    const task = await Task.findOne({
        where: {
            id: id
        },
        include: {
            model: User,
            where: {
                id : userId
            }
        }
    })
    
    if (!task) {
        throw new Error('Task non trovato')
    }
    
    await task.destroy()
    return task;
}

