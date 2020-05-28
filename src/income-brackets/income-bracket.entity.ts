import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CustomerEntity } from '../modules/companies-customers/customer.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('income_brackets')
export class IncomeBracketEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title/value of the education_stage '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true})
    title: string

    @ApiProperty({ description: 'The is the minimum income'})
    @Column('numeric')
    minimum_income: number

    @ApiProperty({ description: 'The is the maximum income'})
    @Column('numeric')
    maximum: number

    /* One income bracket can have MANY customers*/
    @OneToMany( type => CustomerEntity, customer => customer.income_bracket )
    customers: CustomerEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}