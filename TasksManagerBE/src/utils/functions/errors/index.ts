import { ErrorType } from "../../types/ErrorTypes"

export const setError = (msg:string) : ErrorType => {
    return {
        msg: msg
    }
}