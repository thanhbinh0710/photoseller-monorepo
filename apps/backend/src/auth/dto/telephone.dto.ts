import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, Matches } from 'class-validator';

export class AddTelephoneDto {
  @ApiProperty({
    example: '+84901234567',
    description: 'Phone number with country code',
  })
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be valid international format',
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
    example: '+84907654321',
    description: 'Updated phone number',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be valid international format',
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
