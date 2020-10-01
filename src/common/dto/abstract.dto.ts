import { Exclude, Expose } from "class-transformer";

@Exclude()
export class AbstractDto {
    @Expose()
    id: string

    @Expose()
    CreatedAt: Date

    @Expose()
    UpdatedAt: Date
}