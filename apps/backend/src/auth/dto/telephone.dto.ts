import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, Matches } from 'class-validator';

export class AddTelephoneDto {
  @ApiProperty({
    example: '+84901234567 or 0901234567',
    description:
      'Phone number (international format with +84, or Vietnamese domestic format)',
  })
  @IsString()
  @Matches(/^[\+]?[\d\s\-\(\)]{9,}$/, {
    message:
      'Phone number must contain at least 9 digits (international or domestic format)',
  })
  phoneNumber: string;

  @ApiProperty({
    example: false,
    description: 'Set as primary phone number',
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateTelephoneDto {
  @ApiProperty({
    example: '+84907654321 or 0907654321',
    description:
      'Updated phone number (international format with +84, or Vietnamese domestic format)',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^[\+]?[\d\s\-\(\)]{9,}$/, {
    message:
      'Phone number must contain at least 9 digits (international or domestic format)',
  })
  phoneNumber?: string;

  @ApiProperty({
    example: true,
    description: 'Set as primary phone number',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
