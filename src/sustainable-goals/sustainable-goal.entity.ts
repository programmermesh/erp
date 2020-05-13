import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('sustainable_goals')
export class SustainableGoalEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the unique name for the sustainable goal '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true})
    name: string

    @ApiProperty({ description: 'This is the url for the image used' })
    @Column('varchar', { length: 300, nullable: true })
    @ApiPropertyOptional()
    image_uri: string
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @Column('varchar', { length: 255, nullable: true })
    @ApiPropertyOptional()
    description: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}