import { Project, User } from '../models'
import { ProjectInput, ProjectOutput } from '../utils/interfaces/ProjectInterface'


export const create = async (payload: ProjectInput, userId: number): Promise<ProjectOutput> => {
    const project = await Project.create(payload)
    
    await project.setUser(userId);
    return project;
}

export const getAll = async (): Promise<ProjectOutput[]> => {
    const projects = await Project.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
    });
    
    return projects;
}

export const getAllByUserId = async (id: number): Promise<ProjectOutput[]> => {
    const projects = await Project.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        include: {
            model: User,
            where: {
                id : id
            }
        }
    })
    return projects;
}

export const getAllByStatus = async (userId: number, status: boolean): Promise<ProjectOutput[]> => {
    console.log(status)
    const projects = await Project.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
        where: {
            status : status
        },
        include: {
            model: User,
            where: {
                id : userId
            }
        }
    })
    return projects;
}

export const getById = async (id: number, userId: number): Promise<ProjectOutput> => {
    const project = await Project.findOne({
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
    if (!project) {
        throw new Error('Progetto non trovato')
    }
    return project;
}

export const update = async (id: number, payload: Partial<ProjectInput>): Promise<ProjectOutput> => {
    const project = await Project.findByPk(id)
    
    if (!project) {
        throw new Error('Progetto non trovato')
    }
    const updatedProject = await project.update(payload)
    return updatedProject;
}

export const deleteById = async (id: number, userId: number): Promise<ProjectOutput> => {
    const project = await Project.findOne({
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
    
    if (!project) {
        throw new Error('Progetto non trovato')
    }
    
    await project.destroy()
    return project;
}

