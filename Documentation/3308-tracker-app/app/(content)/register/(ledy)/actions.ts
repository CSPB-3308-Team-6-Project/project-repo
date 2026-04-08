'use server';

import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashPassword } from '@/lib/auth/password-helpers';
import { RegisterFormValues } from './register-page';

export type RegisterState = {
  error: string;
  message: string;
  success: boolean;
};

export async function createUser(
  formData: RegisterFormValues
): Promise<RegisterState> {

  const name = formData.name?.toString().trim();
  const email = formData.email?.toString().trim().toLowerCase();
  const password = formData.password?.toString().trim();
  const cuID = formData.cuID?.toString().trim();

  if (!name || !email || !password) {
    return {
      error: 'invalid params',
      message: 'All fields are required.',
      success: false,
    };
  }

  const hashedPassword = await hashPassword(password);

  try {
    const createdUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        cuID: cuID ? cuID : '',
        trackerIDs: [],
      },
    });

    if (!createdUser) {
      return {
        error: 'no user',
        message: 'Failed to create user.',
        success: false,
      };
    }
    return {
      error: '',
      message: '',
      success: true,
    };

  } catch (error: any) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        error: 'duplicate user',
        message: 'An account with this email already exists.',
        success: false,
      };
    }

    return {
      error: 'error',
      message: 'Something went wrong while creating the account.',
      success: false,
    };
  }
}