import { User } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import argon2 from 'argon2'
import { UserMutationResponse } from "../types/UserMutationResponse";
import { RegisterInput } from "../types/RegisterInput";
import { validateRegisterInput } from "../types/utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";
import { Context } from "../types/Context";
import { COOKIE_NAME } from "../constant";


@Resolver()
export class UserResolver {
    @Query(_return => User, {nullable: true})
    async me(@Ctx() {req}: Context): Promise<User | undefined | null> {
        if (!req.session.userID) return null
        const user = await User.findOne(req.session.userID)
        return user
    }

    @Mutation(_return => UserMutationResponse, {nullable: true})
    async register(
        @Arg('registerInput')  registerInput: RegisterInput,
        @Ctx() {req}: Context
    ): Promise<UserMutationResponse | null> {
        const validateRegisterInputErrors = validateRegisterInput(registerInput)
        if (validateRegisterInputErrors !== null) {
            return {code: 400, success: false, ...validateRegisterInputErrors}
        }

        try {
            const {username, email, password} = registerInput
            const existingUser = await User.findOne({
                where: [{username}, {email}]
            })
            if (existingUser) return {
                code: 400,
                success: false,
                message: 'Duplicated username or email',
                errors: [
                    {field: existingUser.username === username ? 'username' : 'email', 
                    message: `${existingUser.username === username ? 'Username' : 'Email'} already taked`}
                ]
            }

            const hashedPassword = await argon2.hash(password)
            const newUser = User.create({
                username,
                password: hashedPassword,
                email
            })

            await User.save(newUser)

            req.session.userID = newUser.id
            req.session.userIDName = newUser.username

            return {
                code: 200,
                success: true,
                message: 'User registration successful',
                user: newUser
            }
        } 
        catch (error) {
            console.log(error)
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error.message}`
            }
        }
        
    }

    @Mutation(_return => UserMutationResponse)
	async login(
		@Arg('loginInput') loginInput: LoginInput,
		@Ctx() { req }: Context
	): Promise<UserMutationResponse> {
		try {
            const {username, password} = loginInput
			const existingUser = await User.findOne(
				username.includes('@')
					? { email: username }
					: { username: username }
			)

			if (!existingUser)
				return {
					code: 400,
					success: false,
					message: 'User not found',
					errors: [
						{ field: 'username', message: 'Username or email incorrect' }
					]
				}

			const passwordValid = await argon2.verify(existingUser.password, password)

			if (!passwordValid)
				return {
					code: 400,
					success: false,
					message: 'Wrong password',
					errors: [{ field: 'password', message: 'Wrong password' }]
				}

			// Create session and return cookie
			req.session.userID = existingUser.id

			return {
				code: 200,
				success: true,
				message: 'Logged in successfully',
				user: existingUser
			}
		} catch (error) {
			console.log(error)
			return {
				code: 500,
				success: false,
				message: `Internal server error ${error.message}`
			}
		}
	}

    @Mutation(_return => Boolean)
    logout(@Ctx() {req,res}: Context): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            res.clearCookie(COOKIE_NAME)
            req.session.destroy(error => {
                if (error) {
                    console.log('DESTROYING SESSION ERROR!', error)
                    resolve(false)
                }
                resolve(true)
            })
        })
        
    }
}