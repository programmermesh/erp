import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  Logger,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity as User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { uploadImageToS3 } from '../../utils/s3UploadImages';
import { FILETYPE } from '../../common/enum_values';
import { AuthService } from '../auth/auth.service';
import { sendMail } from '../../utils/sendEmail';
import { ResendEmailDto } from './dto/resend-email.dto';
import { OnboardingDto } from './dto/onboarding.dto';
import e = require('express');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  private logger = new Logger('Userservice');

  getUsers(): Promise<User[]> {
    return this.userRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getUserById(user: User) {
    const userFound = await this.userRepo.findOne(user.id);
    if (userFound) {
      const { password, ...return_result } = userFound; //remove password from result
      return { status: 'success', result: return_result };
    } else {
      throw new NotFoundException(`User with ID "${user.id}" not found`);
    }
  }

  async createUser(userData: Partial<CreateUserDto>) {
    const userExists = await this.userRepo.findOne({ email: userData.email });
    if (userExists) {
      throw new HttpException(
        'Email entered is already registered',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      // SEND THE USER A VERIFICATION MESSAGE
      const token = this.authService.generateVerifyToken(
        userData.firstname_lastname,
      );
      (userData.active_token = token),
        (userData.email = userData.email),
        (userData.firstname_lastname = userData.firstname_lastname),
        (userData.password = userData.password);
      const user = await this.userRepo.save(userData);
      const url = `${process.env.VERIFICATION_URL}/${token}`;
      const compose =
        `Hello ${userData.firstname_lastname} <br><br>` +
        ` Activate your account using the link below.<br><br>` +
        `<h5><a style="color: #ee491f;" href="${url}">${url}</a></h5><br> ` +
        `<p>Thank you for joining <span style="color: #ee491f;"><b>VibrantCreator</b></span> and we look forward to seeing you onboard.</p>` +
        `Best Regards, <br/> VibrantCreator Team`;

      await sendMail(
        userData.email,
        'Account Verification',
        'Successful Verification for an account',
        compose,
      );
      return {
        ResponseCode: '00',
        ResponseDescription: 'Kindly check your email for verification link',
      };
    }
  }

  async verifyEmail(token: any) {
    const userFound = await this.userRepo.findOne({ active_token: token });
    if (userFound && userFound.is_verified == false) {
      userFound.is_verified = true;
      const user = await this.userRepo.save(userFound);
      return {
        ResponseCode: '00',
        ResponseDescription: 'Account Activated Succesfully',
      };
    } else if (userFound && userFound.is_verified == true) {
      return {
        ResponseCode: '03',
        ResponseDescription: 'Account already Activated',
      };
    } else {
      return {
        ResponseCode: '99',
        ResponseDescription: 'Invalid Activation Code',
      };
    }
  }

  async resendVerifyEmail(userData: ResendEmailDto) {
    const userExists = await this.userRepo.findOne({ email: userData.email });
    if (!userExists) {
      throw new HttpException(
        `User with ${userData.email} does not exist`,
        HttpStatus.BAD_REQUEST,
      );
    } else if (userExists && userExists.is_verified == true) {
      return {
        ResponseCode: '99',
        ResponseDescription: 'Account already Verified',
      };
    } else {
      const token = userExists.active_token;
      const url = `${process.env.VERIFICATION_URL}/${token}`;
      const compose =
        `Hello ${userExists.firstname_lastname} <br><br>` +
        ` Activate your account using the link below.<br><br>` +
        `<h5><a style="color: #ee491f;" href="${url}">${url}</a></h5><br> ` +
        `<p>Thank you for joining <span style="color: #ee491f;"><b>VibrantCreator</b></span> and we look forward to seeing you onboard.</p>` +
        `Best Regards, <br/> VibrantCreator Team`;

      await sendMail(
        userData.email,
        'Account Verification',
        'Successful Verification for an account',
        compose,
      );
      return {
        ResponseCode: '00',
        ResponseDescription: 'Kindly check your email for verification link',
      };
    }
  }

  // async onboarding(id: any, userDate: OnboardingDto) {
  //   const userFound = await this.userRepo.findOne(id);
  //   if (!userFound) {
  //     throw new HttpException(`User does not exist`, HttpStatus.BAD_REQUEST);
  //   } else {
  //     (userFound.department = userDate.department),
  //       (userFound.role = userDate.role),
  //       (userFound.business_objectives = userDate.business_objectives),
  //       (userFound.business_stage = userDate.business_stage),
  //       (userFound.company_name = userDate.company_name),
  //       (userFound.team_size = userDate.team_size),
  //       (userFound.investors_time_reference =
  //         userDate.investors_time_reference);
  //     userFound.is_active = true;

  //     const user = await this.userRepo.save(userFound);
  //     //await this.userRepo.findOne(id);
  //     this.sendConfirmationEmail(userFound.email, userFound.firstname_lastname);

  //     //SEND A VERIFICATION EMAIL
  //     //CREATE A TOKEN FOR THE REGISTERED USER
  //     const payload = {
  //       email: userFound.email,
  //       id: userFound.id,
  //       name: userFound.firstname_lastname,
  //       profile_photo: userFound.profile_photo,
  //     };
  //     const token = this.authService.generateToken(userFound);
  //     return {
  //       user: user,
  //       token: token,
  //       ResponseCode: '00',
  //       ResponseDescription: 'User created successfully',
  //     };
  //   }
  // }

  async uploadProfilePhoto(user: User, file: any, fileType: FILETYPE) {
    const userFound = await this.userRepo.findOne(user.id);
    if (!userFound) {
      throw new NotFoundException(`User with ID not found`);
    }
    const urlKey = `${fileType}/${userFound.id}/${Date.now().toString()}-${
      file.originalname
    }`;
    //const urlKey = `users/profile_photos/${Date.now().toString()}-${file.originalname}`

    const data = await uploadImageToS3(null, file, urlKey);
    if (data.success) {
      //update the sustainable goal table
      userFound.profile_photo = data.url;
      if (userFound.password) {
        delete userFound.password; //avoid saving the user password
      }
      console.log(userFound);
      const updateImage = await this.userRepo.save(userFound);
      return Promise.resolve({
        status: 'success',
        result: userFound,
      });
    }
  }

  async updateUser(user: User, updateData: UpdateUserDto): Promise<any> {
    const userFound = await this.userRepo.findOne(user.id);
    if (!userFound) {
      throw new NotFoundException(`User with ID "${user.id}" not found`);
    }
    try {
      this.userRepo.merge(userFound, updateData);
      if (userFound.password) {
        delete userFound.password; //avoid saving the user password
      }
      const result = await this.userRepo.save(userFound);
      const { password, ...return_result } = result; //remove password from result
      return Promise.resolve({
        status: 'success',
        result: return_result,
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string): Promise<any> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" could not be deleted`);
    }

    return Promise.resolve({
      result,
      status: 'success',
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  private async sendConfirmationEmail(email: string, name: string) {
    const compose =
      `Hello ${name}. <br><br>Your account registration was successful with VibrantCreator.<br><br>` +
      `You can proceed to login to your acccount using your email and address in the link below.<br><br>` +
      `<h5><a style="color: #ee491f;" href="${process.env.FRONTEND_BASE_URL}/login">${process.env.FRONTEND_BASE_URL}</a></h5><br> ` +
      `<p>Thank you for joining <span style="color: #ee491f;"><b>VibrantCreator</b></span> and we look forward to seeing you onboard.</p>` +
      `Best Regards, <br/> VibrantCreator Team`;

    await sendMail(
      email,
      'Account Registration',
      'Successful registration for an account',
      compose,
    );
    return true;
  }
}
