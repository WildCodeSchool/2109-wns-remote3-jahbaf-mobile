export interface LoginInput {
    email: string,
    password: string,
}

export interface SignupInput {
    email: string,
    password: string,
    passwordCheck: string,
    name?: string,
}