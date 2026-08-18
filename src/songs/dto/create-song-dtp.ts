import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: String;
  @IsNotEmpty()
  @IsArray()
  readonly artist: String[];
  @IsNotEmpty()
  @IsDateString()
  readonly realseDate: Date;
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;
}
