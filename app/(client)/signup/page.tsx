'use client'


import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
    UserCircleIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

import { useState } from 'react';

import clsx from 'clsx';
import { useRouter } from "next/navigation";

type FormErrors = {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    password?: string;
};

export default function SignUpForm() {

    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        const formData = new FormData();
        const lastname = (form.elements.namedItem("lastname") as HTMLInputElement).value;
        const firstname = (form.elements.namedItem("firstname") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const phone_number = (form.elements.namedItem("phone") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;


      const API_URL = process.env.NODE_ENV ==="development" ? process.env.NEXT_PUBLIC_API_URL :
      process.env.API_URL

        const res = await fetch(`${process.env.API_URL}/users`, {
            method: "POST",
            credentials: "include", // 👈 allows cookies
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname,
                lastname,
                phone_number,
                email,
                password,
                role : "user"
            }),
        });

        if (res.ok && res.status == 201) {
            const data = await res.json();
            setSuccess(true);
            setMsg(data.message)
            // Redirect to verify page after 2 seconds
            setTimeout(() => {
                router.push("/verify_account");
            }, 2000);

        } else {
            const data = await res.json();
            console.log(data.errors.firstname)
            setErrors(data.errors);
        }
    }

    return (
    <div className="space-y-2" >
      <div className="flex-1 flex justify-center items-center p-6">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-10">

            <div className="text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                TS
              </div>

              <h2 className="mt-6 text-3xl font-bold text-primary">
                Create Acount
              </h2>

              <p className="text-gray-500 mt-2">
                Welcome to Titansports
              </p>

            </div>

            <div>
              
            </div>
            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

              <div className='grid sm:grid-cols-2 gap-2'>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                 First Name
                </label>

                <input
                  type="text"
                  name="firstname"
                  placeholder="titansports"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors?.firstname && <div className='text-red-500 bg-white p-2'>
                  {errors?.firstname}
                </div>}
                </div>

                <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                 Last Name
                </label>

                <input
                  type="text"
                  name="lastname"
                  placeholder="titansports"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors?.firstname && <div className='text-red-500 bg-white p-2'>
                  {errors?.lastname}
                </div>}
              </div>

              </div>

              

              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="admin@titansports.com"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors?.email && <div className='text-red-500 bg-white p-2'>
                  {errors?.email}
                </div>}

              </div>


              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="0-729-455-662"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                {errors?.phone && <div className='text-red-500 bg-white p-2'>
                 {errors.phone}
                </div>}

              </div>

              

              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="........."
                    className="w-full px-5  py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <button
                    type="button"

                    className="absolute right-4 top-3 text-gray-500 hover:text-primary"
                  >
                    👁
                  </button>

                </div>
                {errors?.password && <div className='text-red-500 bg-white p-2'>
                  {errors?.password}
                </div>}

              </div>

              

              <button
                className="w-full bg-orange-400 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
              >
                create Account
              </button>

            </form>

            


          </div>

        </div>
    </div>
    );
}
