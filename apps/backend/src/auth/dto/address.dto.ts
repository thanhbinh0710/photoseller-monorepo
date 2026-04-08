import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, MaxLength } from 'class-validator';

export class AddAddressDto {
  @ApiProperty({
    example: 'Home',
    description: 'Address label (e.g., Home, Office)',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  label?: string;

  @ApiProperty({
    example: '123 Nguyen Hue Street',
    description: 'Street address',
  })
  @IsString()
  @MaxLength(200)
  street: string;

  @ApiProperty({
    example: 'Ho Chi Minh City',
    description: 'City',
  })
  @IsString()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    example: 'Ho Chi Minh',
    description: 'State/Province',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  state?: string;

  @ApiProperty({
    example: '700000',
    description: 'Postal code',
  })
  @IsString()
  @MaxLength(20)
  postalCode: string;

  @ApiProperty({
    example: 'Vietnam',
    description: 'Country',
    default: 'Vietnam',
  })
  @IsString()
  @MaxLength(100)
  country: string;

  @ApiProperty({
    example: false,
    description: 'Set as primary address',
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

export class UpdateAddressDto {
  @ApiProperty({
    example: 'Office',
    description: 'Address label',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  label?: string;

  @ApiProperty({
    example: '456 Le Loi Street',
    description: 'Street address',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  street?: string;

  @ApiProperty({
    example: 'Hanoi',
    description: 'City',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string;

  @ApiProperty({
    example: 'Hanoi',
    description: 'State/Province',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  state?: string;

  @ApiProperty({
    example: '100000',
    description: 'Postal code',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  postalCode?: string;

  @ApiProperty({
    example: 'Vietnam',
    description: 'Country',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string;

  @ApiProperty({
    example: true,
    description: 'Set as primary address',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}
