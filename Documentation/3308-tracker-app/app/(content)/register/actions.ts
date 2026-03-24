'use server';

import { redirect } from 'next/navigation';

export async function createUser(formData: FormData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');
  const cuID = formData.get('cuID');

  console.log("User submitted:");
  console.log({ firstName, lastName, email, password, cuID });

  redirect('/profile');
}