import Link from "next/link";

//Import the CreateUser function from actions file
import { createUser } from "../actions";

//Export default primary value module gives to app
//RegisterPage Function essentially builds the page, which is the main function to be exported
export default async function RegisterPage() {

    //Everything inside these parentheses is what will show on the page
  return (
    <div>
        {/* Main Title*/}
      <h1>Register</h1> 
       {/* This is the form. This part means that when the user eventually clicks the submit button,
       It'll redirect the input to the createUser funtion. This s what it means to be 'connected to the server action'*/}
      <form action={createUser}>

        {/* First Name input */}
        {/* labels the box. So this field is called 'First Name'*/}
        <div>
          <label htmlFor="firstName">First Name</label>
          {/* This is adds the actual field the user types into. It's connected to 'First Name'*/}
          <input id="firstName" name="firstName" type="text" />
        </div>

        {/* Last Name input; Same thing */}
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" />
        </div>
         {/* Same Idea for the Rest*/}
        <div>
          <label htmlFor="email">Email</label>
           {/* Watch out for the 'types'. In this case, its type email bc it should only pass email format*/}
          <input id="email" name="email" type="email" />
        </div>

        <div>
             {/* type password hides what the user types by only showing dots or other*/}
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" />
        </div>

        <div>
          <label htmlFor="cuID">CU ID</label>
          <input id="cuID" name="cuID" type="text" />
        </div>

        <div>
         {/* this is the submit button.clicking this button causes the form data to be sent to createUser.
         I named the button 'Register', we can change it to submit if preferred.
        */}
          <button type="submit">Register</button>

          {/* In case the user no longer wants to register, redirect to the homepage. '/' is homepage*/}
          <Link href="/">
            <button type="button">Cancel</button>
          </Link>
        </div>

      </form>
    </div>
  );
}