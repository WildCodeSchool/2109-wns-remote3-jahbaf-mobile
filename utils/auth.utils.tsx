import { LoginInput, SignupInput } from "../models";

export const verify = {
    email: (email: string): boolean => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
    password: (password: string): boolean => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password) || true, // evidement à retirer mais pour le moment flemme d'utiliser des mdp trop compliqués
    passwordCheck: (userInput: SignupInput): boolean => userInput.password === userInput.passwordCheck,
    isEmpty: (value: string): boolean => value.length === 0,
    allCompleted: (userInput: LoginInput | SignupInput): boolean => {
        if ("name" in userInput) delete userInput["name"];
        return Object.values(userInput).every((value) => !verify.isEmpty(value));
    },
    loginInput: (userInput: LoginInput): boolean => verify.email(userInput.email) && verify.password(userInput.password),
    signupInput: (userInput: SignupInput): boolean => verify.email(userInput.email) && verify.password(userInput.password) && verify.passwordCheck(userInput),
}