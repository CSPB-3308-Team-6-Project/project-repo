'use server';

import { prisma } from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hashPassword } from '@/lib/auth';

export type RegisterState = {
  error: string;
  success: boolean;
};

export async function createUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const firstName = formData.get('firstName')?.toString().trim();
  const lastName = formData.get('lastName')?.toString().trim();
  const email = formData.get('email')?.toString().trim().toLowerCase();
  const password = formData.get('password')?.toString().trim();
  const cuID = formData.get('cuID')?.toString().trim();

  if (!firstName || !lastName || !email || !password || !cuID) {
    return {
      error: 'All fields are required.',
      success: false,
    };
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        name: fullName,
        email,
        password: hashedPassword,
        cuID,
        trackerIDs: [],
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        error: 'An account with this email already exists.',
        success: false,
      };
    }

    return {
      error: 'Something went wrong while creating the account.',
      success: false,
    };
  }

  return {
    error: '',
    success: true,
  };
}