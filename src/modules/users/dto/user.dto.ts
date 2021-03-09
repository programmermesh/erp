import { Exclude, Expose } from 'class-transformer';
import { AbstractDto } from '../../../common/dto/abstract.dto';

@Exclude()
export class UserDto extends AbstractDto {
  @Expose()
  email: string;

  @Expose()
  firstname_lastname: string;

  @Expose()
  password: string;

  @Expose()
  profile_photo: string;

  @Expose()
  company_name: string;

  @Expose()
  department: string;

  @Expose()
  role: string;

  @Expose()
  team_size: string;

  @Expose()
  business_stage: string;

  @Expose()
  business_objectives: string;

  @Expose()
  investors_time_reference: string;

  @Expose()
  is_verified: boolean;

  @Expose()
  is_active: boolean;

  @Expose()
  active_token: boolean;
}
