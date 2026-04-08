'use client'

import { href } from "@/lib/url-helper";
import { TextInput, Fieldset, PasswordInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLoading } from "@/components/providers/loading-provider";
import { colors, colorScheme } from "@/lib/color-scheme";

type UserLoginFormType = UseFormReturnType<{
    email: string;
    password: string;
}, (values: {
    email: string;
    password: string;
}) => {
    email: string;
    password: string;
}>

export default function LoginPage() {

    const { setLoading } = useLoading();
    const router = useRouter();

    const userForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: (value: string) => (
                !value ? 'Email is required'
                    : !/^\S+@\S+$/.test(value) ? 'Invalid email'
                        : value.length < 5 ? 'Invalid email'
                            : null
            ),
            password: (value: string) => (
                !value ? 'Password is required'
                    : value.length < 5 ? 'Password length must be greater than 5 characters' : null
            )
        }
    })

    const handleSignInAttempt = async ({ userForm }: { userForm: UserLoginFormType }) => {

        userForm.clearErrors();
        setLoading(true);

        if (!userForm) {
            console.log('No form data');
            setLoading(false);
            return;
        }

        try {

            userForm.clearErrors();
            const validation = userForm.validate();

            if (validation.hasErrors) {
                userForm.setErrors(validation.errors)
                setLoading(false)
                return
            }

            const values = userForm.getValues();

            const signInTest = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (!signInTest) {
                console.log('No response from NextAuth sign in attempt');
                toast.error('Err occurred during sign in, Please try again');
                setLoading(false);
                return;
            }
            
            if (signInTest.error) {
                console.log('Sign in attempt failed: ', signInTest.error);
                toast.error('Wrong email or password, please try again');
                setLoading(false);
                return;
            }

            toast.success('Sign in successful! Redirecting to your profile...');
            router.push(href('/profile'));
            return;

        } catch (error: any) {
            console.log('Error with sign in attempt: ', error);
            toast.error('An error occurred during sign in, Please try again');
            setLoading(false);
            return;
        }
    }


    return (
        <div className="flex flex-col justify-start items-center w-[dvw] h-[dvh] space-y-12">
            <form id="modaluserForm" onSubmit={userForm.onSubmit(() => handleSignInAttempt({ userForm }))} className="w-full">
                <Fieldset legend="Personal Information" style={{ backgroundColor: colors.card, borderColor: colors.inputBorder, color: colors.textPrimary }}>
                    <TextInput
                        id="testRegEmail"
                        name="testRegEmail"
                        label="Email"
                        placeholder="email@email.com"
                        mt={'md'}
                        withAsterisk
                        key={userForm.key('email')}
                        {...userForm.getInputProps('email')}
                        styles={{
                            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                            label: { color: colors.label }
                        }}
                    />
                    <PasswordInput
                        id="testRegPw"
                        name="testRegPw"
                        label="Password"
                        placeholder="******"
                        withAsterisk
                        mt={'md'}
                        key={userForm.key('password')}
                        {...userForm.getInputProps('password')}
                        styles={{
                            input: { backgroundColor: colors.input, color: colors.textPrimary, borderColor: colors.inputBorder },
                            label: { color: colors.label }
                        }}
                    />
                </Fieldset>
                <div className="flex flex-row w-full justify-evenly items-center pt-5">
                    <button type='submit' className={`border rounded-md p-2 w-1/5 text-xs sm:text-sm cursor-pointer ${colorScheme.buttonLogin}`} aria-label={'test-db-with-register'}>
                        {'Login In'}
                    </button>
                </div>
            </form>
        </div>
    );
}