import { User } from '../models'
import { UserInput, UserOutput } from '../utils/interfaces/UserInterface'


export const create = async (payload: UserInput): Promise<UserOutput> => {
    try {
        const user = await User.create(payload)
        return user;
    } catch(e:any) {
        throw new Error(`Non è stato possibile creare l'utenza`)
    }
}

export const getAll = async (): Promise<UserOutput[]> => {
    const users = await User.findAll();
    return users;
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('User non trovato')
    }
    return user;
}

export const getByEmail = async (email: string): Promise<UserOutput> => {
    const user = await User.findOne({
        where: {
            email:email
        }
    })
    if (!user) {
        throw new Error('User non trovato')
    }
    return user;
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('User non trovato')
    }
    const updatedUser = await user.update(payload)
    return updatedUser;
}

export const deleteById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id)
    if (!user) {
        throw new Error('User non trovato')
    }
    await user.destroy()
    return user;
}


