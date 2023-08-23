// Tipo User
export type UserType = {
    id: number,
    email: string,
    name: string,
    passwordHash: string,
}

// Tipo User 
export type UserPayloadType = {
    id: number,
    email: string,
    name: string;
    password: string,
}

// Tipo di dato passato quando viene fatta la modifica
export type UserEditPayloadType = Pick<UserPayloadType, 'password'| 'name'>

// Tipo user senza pass 
export type UserNoPassType = Pick<UserType, 'email'| 'name'|'id'>;

export type jwtAccessPayload = UserNoPassType & {readonly aud: 'access'}
export type jwtRefreshPayload = Pick<UserType, 'id'> & {readonly aud: 'refresh'}
export type jwtPayload = jwtAccessPayload | jwtRefreshPayload

export type LoginObj = {
    user: UserNoPassType,
    token: {
        access: string,
        refresh: string
    }
}