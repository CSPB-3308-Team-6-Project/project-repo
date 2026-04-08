'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { hashPassword, verifyPassword } from '@/lib/auth/password-helpers';
import { ITracker } from '@/types/tracker/tracker';
import { ITrackerPost } from '@/types/tracker/tracker-post';

export type PasswordResult = {
  error: string;
  success: string;
};

//check empty fields
export async function updateUser(formData: FormData) {
  const userId = Number(formData.get('userId'));
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const cuID = formData.get('cuID')?.toString().trim();

  if (!userId || !name || !email || !cuID) {
    throw new Error('All fields are required.');
  }

  const fullName = `${name}`.trim();

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: fullName,
      email,
      cuID,
    },
  });

  revalidatePath('/profile');
  redirect('/profile');
}

export async function changePassword(formData: FormData): Promise<PasswordResult> {
  const userId = Number(formData.get('userId'));
  const oldPassword = formData.get('oldPassword')?.toString().trim();
  const newPassword = formData.get('newPassword')?.toString().trim();
  const confirmPassword = formData.get('confirmPassword')?.toString().trim();

  if (!userId || !oldPassword || !newPassword || !confirmPassword) {
    return {
      error: 'All password fields are required.',
      success: '',
    };
  }
  //check passwords match
  if (newPassword !== confirmPassword) {
    return {
      error: 'New passwords do not match.',
      success: '',
    };
  }

  //get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      error: 'User not found.',
      success: '',
    };
  }

  // check old password
  //Verify the password the user typed actually matches the hashed password in our database
  const passwordMatches = await verifyPassword({ password: oldPassword, hashedPassword: user.password });

  if (!passwordMatches) {
    return {
      error: 'Old password is incorrect.',
      success: '',
    };
  }

  //Make sure new password is not the same as the old password
  const sameAsOld = await verifyPassword({ password: newPassword, hashedPassword: user.password });

  if (sameAsOld) {
    return {
      error: 'New password must be different from the old password.',
      success: '',
    };
  }

  //update password
  //Hash the new password before saving 
  const hashedNewPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedNewPassword,
    },
  });

  //await prisma.user.update({
  //  where: { id: userId },
  //  data: {
  //    password: newPassword,
  //  },
  //});

  revalidatePath('/profile');

  return {
    error: '',
    success: 'Password updated successfully.',
  };
}

export async function deleteAccount(userId: number, trackers: ITracker[] | null, trackerPosts: ITrackerPost[] | null): Promise<{ success: boolean; error: string }> {

  if (!userId) {
    return { success: false, error: 'User ID is required.' };
  }

  try {

    if (trackerPosts && trackerPosts.length > 0) {

      await prisma.trackerPost.deleteMany({
        where: { id: { in: trackerPosts.map(post => post.id) } },
      });

    }

    if (trackers && trackers.length > 0) {

      await prisma.tracker.deleteMany({
        where: { id: { in: trackers.map(tracker => tracker.id) } },
      });

    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true, error: '' };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { success: false, error: 'An error occurred while deleting the account.' };
  }

}