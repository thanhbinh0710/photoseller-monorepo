import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UpdatePasswordDto,
  UpdateProfileDto,
  AddTelephoneDto,
  UpdateTelephoneDto,
  AddAddressDto,
  UpdateAddressDto,
} from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        telephones: {
          orderBy: { isPrimary: 'desc' },
        },
        addresses: {
          orderBy: { isPrimary: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      statusCode: 200,
      success: true,
      message: 'Profile retrieved successfully',
      data: user,
    };
  }

  async updatePassword(userId: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);

    // Update password
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Password updated successfully',
    };
  }

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update firstName and/or lastName
    const updateData: any = {};
    if (updateProfileDto.firstName !== undefined) {
      updateData.firstName = updateProfileDto.firstName;
    }
    if (updateProfileDto.lastName !== undefined) {
      updateData.lastName = updateProfileDto.lastName;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }

  // Telephone methods
  async addTelephone(userId: number, addTelephoneDto: AddTelephoneDto) {
    // Check telephone count limit (max 3)
    const telephoneCount = await this.prisma.telephone.count({
      where: { userId },
    });

    if (telephoneCount >= 3) {
      throw new BadRequestException('Maximum 3 phone numbers allowed per user');
    }

    // Check if phone number already exists for this user
    const existingTelephone = await this.prisma.telephone.findFirst({
      where: {
        userId,
        phoneNumber: addTelephoneDto.phoneNumber,
      },
    });

    if (existingTelephone) {
      throw new BadRequestException(
        'This phone number already exists in your list',
      );
    }

    // If setting as primary, unset other primary telephones
    if (addTelephoneDto.isPrimary) {
      await this.prisma.telephone.updateMany({
        where: { userId },
        data: { isPrimary: false },
      });
    }

    const telephone = await this.prisma.telephone.create({
      data: {
        phoneNumber: addTelephoneDto.phoneNumber,
        isPrimary: addTelephoneDto.isPrimary || false,
        userId,
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: 'Phone number added successfully',
      data: telephone,
    };
  }

  async updateTelephone(
    userId: number,
    telephoneId: number,
    updateTelephoneDto: UpdateTelephoneDto,
  ) {
    const telephone = await this.prisma.telephone.findUnique({
      where: { id: telephoneId },
    });

    if (!telephone) {
      throw new NotFoundException('Phone number not found');
    }

    if (telephone.userId !== userId) {
      throw new ForbiddenException(
        'Not authorized to update this phone number',
      );
    }

    // If updating phone number, check for duplicates (excluding current one)
    if (updateTelephoneDto.phoneNumber) {
      const existingTelephone = await this.prisma.telephone.findFirst({
        where: {
          userId,
          phoneNumber: updateTelephoneDto.phoneNumber,
          id: { not: telephoneId }, // Exclude current telephone
        },
      });

      if (existingTelephone) {
        throw new BadRequestException(
          'This phone number already exists in your list',
        );
      }
    }

    // If setting as primary, unset other primary telephones
    if (updateTelephoneDto.isPrimary) {
      await this.prisma.telephone.updateMany({
        where: { userId, id: { not: telephoneId } },
        data: { isPrimary: false },
      });
    }

    const updated = await this.prisma.telephone.update({
      where: { id: telephoneId },
      data: updateTelephoneDto,
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Phone number updated successfully',
      data: updated,
    };
  }

  async removeTelephone(userId: number, telephoneId: number) {
    const telephone = await this.prisma.telephone.findUnique({
      where: { id: telephoneId },
    });

    if (!telephone) {
      throw new NotFoundException('Phone number not found');
    }

    if (telephone.userId !== userId) {
      throw new ForbiddenException(
        'Not authorized to delete this phone number',
      );
    }

    await this.prisma.telephone.delete({
      where: { id: telephoneId },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Phone number deleted successfully',
    };
  }

  async setPrimaryTelephone(userId: number, telephoneId: number) {
    const telephone = await this.prisma.telephone.findUnique({
      where: { id: telephoneId },
    });

    if (!telephone) {
      throw new NotFoundException('Phone number not found');
    }

    if (telephone.userId !== userId) {
      throw new ForbiddenException(
        'Not authorized to modify this phone number',
      );
    }

    // Unset all primary telephones for this user
    await this.prisma.telephone.updateMany({
      where: { userId },
      data: { isPrimary: false },
    });

    // Set this telephone as primary
    const updated = await this.prisma.telephone.update({
      where: { id: telephoneId },
      data: { isPrimary: true },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Primary phone number set successfully',
      data: updated,
    };
  }

  // Address methods
  async addAddress(userId: number, addAddressDto: AddAddressDto) {
    // Check address count limit (max 3)
    const addressCount = await this.prisma.address.count({
      where: { userId },
    });

    if (addressCount >= 3) {
      throw new BadRequestException('Maximum 3 addresses allowed per user');
    }

    // If setting as primary, unset other primary addresses
    if (addAddressDto.isPrimary) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isPrimary: false },
      });
    }

    const address = await this.prisma.address.create({
      data: {
        ...addAddressDto,
        isPrimary: addAddressDto.isPrimary || false,
        userId,
      },
    });

    return {
      statusCode: 201,
      success: true,
      message: 'Address added successfully',
      data: address,
    };
  }

  async updateAddress(
    userId: number,
    addressId: number,
    updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (address.userId !== userId) {
      throw new ForbiddenException('Not authorized to update this address');
    }

    // If setting as primary, unset other primary addresses
    if (updateAddressDto.isPrimary) {
      await this.prisma.address.updateMany({
        where: { userId, id: { not: addressId } },
        data: { isPrimary: false },
      });
    }

    const updated = await this.prisma.address.update({
      where: { id: addressId },
      data: updateAddressDto,
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Address updated successfully',
      data: updated,
    };
  }

  async removeAddress(userId: number, addressId: number) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (address.userId !== userId) {
      throw new ForbiddenException('Not authorized to delete this address');
    }

    await this.prisma.address.delete({
      where: { id: addressId },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Address deleted successfully',
    };
  }

  async setPrimaryAddress(userId: number, addressId: number) {
    const address = await this.prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (address.userId !== userId) {
      throw new ForbiddenException('Not authorized to modify this address');
    }

    // Unset all primary addresses for this user
    await this.prisma.address.updateMany({
      where: { userId },
      data: { isPrimary: false },
    });

    // Set this address as primary
    const updated = await this.prisma.address.update({
      where: { id: addressId },
      data: { isPrimary: true },
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Primary address set successfully',
      data: updated,
    };
  }
}
