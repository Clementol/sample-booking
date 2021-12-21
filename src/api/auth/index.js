import { Router } from "express";
import { signUp, signIn } from "../../controllers/auth";

const authRouter = Router()

authRouter.post('/signup', signUp)
authRouter.post('/signin', signIn)


export {authRouter}