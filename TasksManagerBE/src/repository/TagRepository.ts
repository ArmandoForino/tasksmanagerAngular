import { Tag, User } from '../models'
import { TagInput, TagOutput } from '../utils/interfaces/TagInterface'


export const create = async (payload: TagInput, userId: number): Promise<TagOutput> => {
    const tag = await Tag.create(payload)
    
    await tag.setUser(userId);
    return tag;
}

export const getAll = async (): Promise<TagOutput[]> => {
    const tags = await Tag.findAll({
        order: [
            ["updatedAt", "DESC"],
        ],
    });
    
    return tags;
}

export const getAllByUserId = async (id: number): Promise<TagOutput[]> => {
    const tags = await Tag.findAll({
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
    return tags;
}

export const getById = async (id: number, userId: number): Promise<TagOutput> => {
    const tag = await Tag.findOne({
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
    if (!tag) {
        throw new Error('Tag non trovato')
    }
    return tag;
}

export const update = async (id: number, payload: Partial<TagInput>): Promise<TagOutput> => {
    const tag = await Tag.findByPk(id)
    
    if (!tag) {
        throw new Error('Tag non trovato')
    }
    const updatedTag = await tag.update(payload)
    return updatedTag;
}

export const deleteById = async (id: number, userId: number): Promise<TagOutput> => {
    const tag = await Tag.findOne({
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
    
    if (!tag) {
        throw new Error('Tag non trovato')
    }
    
    await tag.destroy()
    return tag;
}

