//signUpRoutes
interface SignupFormRequest{
	fullName:string
	email:string
	password:string
}

interface SignupFormResponse{
	message?:string
	success?:string;
}
