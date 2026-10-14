import { IsNotEmpty, IsOptional, IsString, Length, ValidateIf } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: 'Company name is required' })
  @Length(2, 100, { message: 'Company name must be between 2 and 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Contact person is required' })
  @Length(2, 100, { message: 'Contact person must be between 2 and 100 characters' })
  contactPerson: string;

  @IsOptional()
  @IsString()
  contactCountryCode?: string;

  @IsString()
  @IsNotEmpty({ message: 'Contact number is required' })
  contactNumber: string;

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
}
