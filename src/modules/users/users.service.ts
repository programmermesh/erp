import { Injectable, HttpException, HttpStatus, NotFoundException, Logger, InternalServerErrorException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity as User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { uploadImageToS3 } from '../../utils/s3UploadImages'
import { FILETYPE } from '../../common/enum_values'
import { AuthService } from '../auth/auth.service'
import { sendMail } from '../../utils/sendEmail'

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly authService: AuthService
    ){}

    private logger = new Logger('Userservice')
    
    getUsers(): Promise<User[]>{
        return this.userRepo.find({
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async getUserById(user: User){
        const userFound = await this.userRepo.findOne(user.id)
        if(userFound){
            const { password, ...return_result } = userFound //remove password from result
            return { status: 'success', result: return_result }
        }else{
            throw new NotFoundException(`User with ID "${user.id}" not found`)
        } 
    }

    async createUser(userData: CreateUserDto){
        const userExists = await this.userRepo.findOne({email: userData.email})
        if(userExists){
            throw new HttpException('Email entered is already registered', HttpStatus.BAD_REQUEST);
        }else{
            const user = await this.userRepo.save(userData)
            // SEND THE USER A REGISTRATION MESSAGE
            this.sendConfirmationEmail(user.email, user.firstname_lastname)
            if(user){
                //SEND A VERIFICATION EMAIL 
                const { password, ...result } = user    
                //CREATE A TOKEN FOR THE REGISTERED USER
                const payload = { email: result.email, id: result.id, name: result.firstname_lastname, profile_photo: result.profile_photo }
                const token = this.authService.generateToken(user)       

                return { success: "User created successfully", result, token }
            }else{
                throw new HttpException('Error trying to register', HttpStatus.BAD_REQUEST);
            }
        }
        
    }

    async uploadProfilePhoto(user: User, file: any, fileType: FILETYPE){
        const userFound = await this.userRepo.findOne(user.id)
        if(!userFound){
            throw new NotFoundException(`User with ID not found`)
        } 
        const urlKey = `${fileType}/${userFound.id}/${Date.now().toString()}-${file.originalname}`
        //const urlKey = `users/profile_photos/${Date.now().toString()}-${file.originalname}`
        
        const data = await uploadImageToS3(
            null,
            file,
            urlKey
        )
        if(data.success){
            //update the sustainable goal table
            userFound.profile_photo = data.url
            if(userFound.password){
                delete userFound.password //avoid saving the user password
            }
            console.log(userFound)
            const updateImage = await this.userRepo.save(userFound)
            return Promise.resolve({
                status: 'success',
                result: userFound
            }) 
        }
    }

    async updateUser(user: User, updateData: UpdateUserDto): Promise<any>{
        const userFound = await this.userRepo.findOne(user.id)
        if(!userFound){
            throw new NotFoundException(`User with ID "${user.id}" not found`)
        }
        try {
            this.userRepo.merge(userFound, updateData)
            if(userFound.password){
                delete userFound.password //avoid saving the user password
            }
            const result = await this.userRepo.save(userFound)
            const { password, ...return_result } = result //remove password from result
            return Promise.resolve({
                status: 'success',
                result: return_result
            })
        } catch (error) {
            this.logger.error(error.message, error.stack)
            throw new InternalServerErrorException()
        } 
                
    }

    async deleteUser(id: string): Promise<any>{
        const result = await this.userRepo.delete(id)
        if(result.affected === 0){
            throw new NotFoundException(`User with ID "${id}" could not be deleted`)
        }

        return Promise.resolve({
            result,
            status: 'success'
        })
    }

    async getUserByEmail(email: string): Promise<User>{
        return this.userRepo.findOne({ 
            where: {email}
        })
    }

    private async sendConfirmationEmail( email: string, name: string){
        const compose = `Hello ${name}. <br><br>Your account registration was successful with VibrantCreator.<br><br>`+
                `You can proceed to login to your acccount using your email and address in the link below.<br><br>`+
                `<h5><a style="color: #ee491f;" href="${process.env.FRONTEND_BASE_URL}/login">${process.env.FRONTEND_BASE_URL}</a></h5><br> `+
                `<p>Thank you for joining <span style="color: #ee491f;"><b>VibrantCreator</b></span> and we look forward to seeing you onboard.</p>`+
                `Best Regards, <br/> VibrantCreator Team`
                
        await sendMail(
            email,
            "Account Registration",
            "Successful registration for an account",
            compose)
        return true
    }
        
}
