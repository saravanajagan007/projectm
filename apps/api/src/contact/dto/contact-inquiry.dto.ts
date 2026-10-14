import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class ContactInquiryDto {
  @IsString()
  @IsNotEmpty({ message: 'Please provide your valid full name.' })
  @MinLength(2, { message: 'Name must be at least 2 characters.' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid business email address.' })
  @IsNotEmpty({ message: 'Email address is required.' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  service?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsString()
  @IsNotEmpty({ message: 'Please provide a brief description of your project.' })
  @MinLength(10, { message: 'Project details must be at least 10 characters.' })
  message: string;

  @IsOptional()
  @IsString()
  honeypot?: string;

  @IsOptional()
  @IsString()
  website_url?: string;
}
