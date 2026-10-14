import { IsOptional, IsString, Length, ValidateIf } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @Length(2, 100, { message: 'Company name must be between 2 and 100 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100, { message: 'Contact person must be between 2 and 100 characters' })
  contactPerson?: string;

  @IsOptional()
  @IsString()
  contactCountryCode?: string;

  @IsOptional()
  @IsString()
  contactNumber?: string;

  @IsOptional()
  @IsString()
  alternateContactCountryCode?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.alternateContactNumber && o.alternateContactNumber.trim().length > 0)
  alternateContactNumber?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.email && o.email.trim().length > 0)
  email?: string;

  @IsOptional()
  deletedImageIds?: string[] | string;
}
