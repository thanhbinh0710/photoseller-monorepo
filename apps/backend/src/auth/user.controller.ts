import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UpdatePasswordDto,
  AddTelephoneDto,
  UpdateTelephoneDto,
  AddAddressDto,
  UpdateAddressDto,
} from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@ApiTags('User Management')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Get current user profile with addresses and phone numbers',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    schema: {
      example: {
        statusCode: 200,
        success: true,
        message: 'Profile retrieved successfully',
        data: {
          id: 2,
          email: 'user1@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'USER',
          isActive: true,
          createdAt: '2026-04-06T10:00:00.000Z',
          updatedAt: '2026-04-06T10:00:00.000Z',
          telephones: [
            {
              id: 1,
              phoneNumber: '+84901234567',
              isPrimary: true,
              createdAt: '2026-04-06T10:00:00.000Z',
              updatedAt: '2026-04-06T10:00:00.000Z',
              userId: 2,
            },
          ],
          addresses: [
            {
              id: 1,
              label: 'Home',
              street: '123 Nguyen Hue Street',
              city: 'Ho Chi Minh City',
              state: 'Ho Chi Minh',
              postalCode: '700000',
              country: 'Vietnam',
              isPrimary: true,
              createdAt: '2026-04-06T10:00:00.000Z',
              updatedAt: '2026-04-06T10:00:00.000Z',
              userId: 2,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@CurrentUser() user: any) {
    return this.userService.getProfile(user.sub);
  }

  @Put('password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update password',
    description: 'Change user password (requires current password)',
  })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
    schema: {
      example: {
        statusCode: 200,
        success: true,
        message: 'Password updated successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Current password is incorrect' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatePassword(
    @CurrentUser() user: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(user.sub, updatePasswordDto);
  }

  // Telephone endpoints
  @Post('telephones')
  @ApiOperation({
    summary: 'Add phone number',
    description: 'Add a phone number to user profile (max 3)',
  })
  @ApiResponse({
    status: 201,
    description: 'Phone number added successfully',
    schema: {
      example: {
        statusCode: 201,
        success: true,
        message: 'Phone number added successfully',
        data: {
          id: 4,
          phoneNumber: '+84901234567',
          isPrimary: false,
          createdAt: '2026-04-06T10:00:00.000Z',
          updatedAt: '2026-04-06T10:00:00.000Z',
          userId: 2,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Maximum 3 phone numbers allowed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addTelephone(
    @CurrentUser() user: any,
    @Body() addTelephoneDto: AddTelephoneDto,
  ) {
    return this.userService.addTelephone(user.sub, addTelephoneDto);
  }

  @Put('telephones/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update phone number',
    description: 'Update a phone number',
  })
  @ApiParam({ name: 'id', description: 'Telephone ID' })
  @ApiResponse({
    status: 200,
    description: 'Phone number updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Phone number not found' })
  @ApiResponse({ status: 403, description: 'Not authorized' })
  async updateTelephone(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTelephoneDto: UpdateTelephoneDto,
  ) {
    return this.userService.updateTelephone(user.sub, id, updateTelephoneDto);
  }

  @Delete('telephones/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete phone number',
    description: 'Remove a phone number from profile',
  })
  @ApiParam({ name: 'id', description: 'Telephone ID' })
  @ApiResponse({
    status: 200,
    description: 'Phone number deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Phone number not found' })
  async removeTelephone(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.removeTelephone(user.sub, id);
  }

  @Patch('telephones/:id/primary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Set primary phone number',
    description: 'Set a phone number as primary',
  })
  @ApiParam({ name: 'id', description: 'Telephone ID' })
  @ApiResponse({
    status: 200,
    description: 'Primary phone number set successfully',
  })
  async setPrimaryTelephone(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.setPrimaryTelephone(user.sub, id);
  }

  // Address endpoints
  @Post('addresses')
  @ApiOperation({
    summary: 'Add address',
    description: 'Add an address to user profile (max 3)',
  })
  @ApiResponse({
    status: 201,
    description: 'Address added successfully',
    schema: {
      example: {
        statusCode: 201,
        success: true,
        message: 'Address added successfully',
        data: {
          id: 4,
          label: 'Home',
          street: '123 Nguyen Hue Street',
          city: 'Ho Chi Minh City',
          state: 'Ho Chi Minh',
          postalCode: '700000',
          country: 'Vietnam',
          isPrimary: false,
          createdAt: '2026-04-06T10:00:00.000Z',
          updatedAt: '2026-04-06T10:00:00.000Z',
          userId: 2,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Maximum 3 addresses allowed' })
  async addAddress(
    @CurrentUser() user: any,
    @Body() addAddressDto: AddAddressDto,
  ) {
    return this.userService.addAddress(user.sub, addAddressDto);
  }

  @Put('addresses/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update address',
    description: 'Update an address',
  })
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiResponse({
    status: 200,
    description: 'Address updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async updateAddress(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.userService.updateAddress(user.sub, id, updateAddressDto);
  }

  @Delete('addresses/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete address',
    description: 'Remove an address from profile',
  })
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiResponse({
    status: 200,
    description: 'Address deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Address not found' })
  async removeAddress(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.removeAddress(user.sub, id);
  }

  @Patch('addresses/:id/primary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Set primary address',
    description: 'Set an address as primary',
  })
  @ApiParam({ name: 'id', description: 'Address ID' })
  @ApiResponse({
    status: 200,
    description: 'Primary address set successfully',
  })
  async setPrimaryAddress(
    @CurrentUser() user: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.setPrimaryAddress(user.sub, id);
  }
}
