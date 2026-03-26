'use client'

import { IUser } from "@/types/user/user";
import { TestUserAuth } from "@/utils/server-actions/test-user-auth";
import { Fieldset, LoadingOverlay, PasswordInput, TextInput } from "@mantine/core"
import { useForm } from '@mantine/form';
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { href } from "@/lib/url-helper";
import { signIn } from "next-auth/react";
import { hashPassword } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function TestAuthPage({ userEmail }: { userEmail: string }) {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const testUserForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
            cuID: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            name: (value: string) => (
                !value ? 'Name is required' : null
            ),
            email: (value: string) => (
                !value ? 'Email is required'
                    : !/^\S+@\S+$/.test(value) ? 'Invalid email'
                        : value.length < 5 ? 'Invalid email'
                            : null
            ),
            password: (value: string) => (
                !value ? 'Password is required'
                    : value.length < 5 ? 'Password length must be greater than 5 characters' : null
            ),
            confirmPassword: (value: string, values: { name: string, email: string, cuID: string, password: string, confirmPassword: string }) => (
                !value ? 'Must confirm your password'
                    : value.length < 5 ? 'Password length must be greater than 5 characters'
                        : value !== values.password ? 'Confirm Password and Password must match'
                            : null
            )
        }
    })

    const handleRegTest = async ({ testUserForm }: { testUserForm: TestRegFormType }) => {

        setLoading(true)

        try {

            testUserForm.clearErrors();
            const validation = testUserForm.validate();

            if (validation.hasErrors) {
                testUserForm.setErrors(validation.errors)
                setLoading(false)
                return
            }

            const values = testUserForm.getValues();

            const hashed = await hashPassword(values.password);

            const userToPass = {
                id: 0,
                name: values.name,
                email: values.email,
                cuID: values.cuID,
                trackerIDs: [],
                createdAt: new Date(new Date().toLocaleDateString()),
                password: hashed
            } as IUser

            const path = href('/test-auth')

            let regAttempt = await TestUserAuth({ userToSet: userToPass }) as { worked: boolean, message: string };

            if (!regAttempt) {
                console.log('Error signing in');
                setLoading(false);
                return;
            }

            if (!regAttempt.worked) {
                console.log('Error with attempt: ', regAttempt.message)
                setLoading(false);
                return
            }

            const signInTest = await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            if (signInTest?.ok) {
                router.push(path);
                router.refresh();
                setLoading(false)
            } else {
                console.log('Issue with sign in:', signInTest?.error);
                setLoading(false);
            }


        } catch (error) {
            setLoading(false);
            return;
        }
    }

    return (
        <div className="flex flex-col justify-start items-center w-[dvw] h-[dvh] space-y-12">
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            {userEmail !== '' ? (
                <p>{userEmail}</p>
            ) : (
                <form id="modaltestUserForm" onSubmit={testUserForm.onSubmit(() => handleRegTest({ testUserForm }))} className="w-full" >
                    <Fieldset legend="Personal Information">
                        <TextInput
                            id="testRegName"
                            name="testRegName"
                            label="Name"
                            placeholder="Johnny Appleseed"
                            mt={'md'}
                            withAsterisk
                            key={testUserForm.key('name')}
                            {...testUserForm.getInputProps('name')}
                        />
                        <TextInput
                            id="testRegEmail"
                            name="testRegEmail"
                            label="Email"
                            placeholder="email@email.com"
                            mt={'md'}
                            withAsterisk
                            key={testUserForm.key('email')}
                            {...testUserForm.getInputProps('email')}
                        />
                        <TextInput
                            id="testRegCUID"
                            name="testRegCUID"
                            label="CU ID"
                            placeholder="aaaa1111"
                            mt={'md'}
                            key={testUserForm.key('cuID')}
                            {...testUserForm.getInputProps('cuID')}
                        />
                        <PasswordInput
                            id="testRegPw"
                            name="testRegPw"
                            label="Password"
                            placeholder="******"
                            withAsterisk
                            mt={'md'}
                            key={testUserForm.key('password')}
                            {...testUserForm.getInputProps('password')}
                        />
                        <PasswordInput
                            id="testRegConfirmPw"
                            name="testRegConfirmPw"
                            label="Confirm Password"
                            placeholder="******"
                            withAsterisk
                            mt={'md'}
                            key={testUserForm.key('confirmPassword')}
                            {...testUserForm.getInputProps('confirmPassword')}
                        />
                    </Fieldset>
                    <div className="flex flex-row w-full justify-evenly items-center pt-5">
                        <button type='submit' className="border border-neutral-200 rounded-md hover:bg-blue-200 bg-blue-400 p-2 w-1/5 text-xs sm:text-sm cursor-pointer" aria-label={'test-db-with-register'}>
                            {'Register'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}


type TestRegFormType = UseFormReturnType<{
    name: string;
    email: string;
    cuID: string;
    password: string;
    confirmPassword: string;
}, (values: {
    name: string;
    email: string;
    cuID: string;
    password: string;
    confirmPassword: string;
}) => {
    name: string;
    email: string;
    cuID: string;
    password: string;
    confirmPassword: string;
}>