export interface AuthSignUpResponseData {
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
}

export interface AuthSignInResponseData extends AuthSignUpResponseData {
    registered: string
}