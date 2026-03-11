//This happens in the server only
'use server';

//This helps us redirect the user
import { redirect } from 'next/navigation';

//The export part is what allows me to use this function in the register page 
//formData contains the values typed byt he user
export async function createUser(formData: FormData) {
  //Now we use .get to actually grab those values and store them in varibales
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const cuID = formData.get('cuID');

  console.log("User submitted:");
  console.log({ name, email, password, cuID });

  // database code will go here later


  //We can redirect soemwhere else later
  redirect('/profile');
}