'use server';

import { redirect } from 'next/navigation';

export async function updateUser(formData: FormData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const cuID = formData.get('cuID');

  console.log('Updating user info:');
  console.log({ firstName, lastName, email, cuID });

  // TODO: update the database here later
}

export async function changePassword(formData: FormData) {
  const oldPassword = formData.get('oldPassword');
  const newPassword = formData.get('newPassword');
  const confirmPassword = formData.get('confirmPassword');

  if (newPassword !== confirmPassword) {
    throw new Error('New passwords do not match.');
  }

  console.log('Changing password:');
  console.log({ oldPassword, newPassword });

  // TODO: verify old password
  // TODO: hash new password
  // TODO: save new password
}

export async function deleteAccount() {
  console.log('Deleting account and tracking data');

  // TODO: delete user profile
  // TODO: delete tracking data

  redirect('/');
}