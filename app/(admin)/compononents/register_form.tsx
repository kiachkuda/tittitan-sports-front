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

export default function SignUpForm() {

    const [error, setError] = useState('');
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
        const phone = (form.elements.namedItem("phone") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;




        const res = await fetch("http://localhost:/api/v1/users", {
            method: "POST",
            credentials: "include", // 👈 allows cookies
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname,
                lastname,
                phone,
                email,
                password,
            }),
        });

        if (res.ok && res.status == 201) {
            const data = await res.json();
            setSuccess(true);
            setMsg(data.message)
            // Redirect to verify page after 2 seconds
            setTimeout(() => {
                router.push("/auth/verify");
            }, 2000);

        } else {
            const data = await res.json();
            if (res.status == 400) {
                if (data.errorType == "name") {
                    setNameError(true);
                    setEmailError(false);
                    setPhoneError(false);
                    setPasswordError(false);
                    setTimeout(() => {
                        setNameError(false);
                    }, 5000);
                }
                if (data.errorType == "email") {
                    setEmailError(true);
                    setNameError(false);
                    setPhoneError(false);
                    setPasswordError(false);
                    setTimeout(() => {
                        setEmailError(false);
                    }, 5000);
                }
                if (data.errorType == "phone") {
                    setPhoneError(true);
                    setEmailError(false)
                    setNameError(false);
                    setPasswordError(false);
                    setTimeout(() => {
                        setEmailError(false);
                    }, 5000);
                }
                if (data.errorType == "password") {
                    setPasswordError(true);
                    setNameError(false);
                    setPhoneError(false);
                    setEmailError(false);
                    setTimeout(() => {
                        setPasswordError(false);
                    }, 5000);
                }

                setError(data.error);

            }
        }
    }

    return (
        <div className="space-y-3" >
      <div className="flex-1 flex justify-center items-center p-8">

          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">

            <div className="text-center">

              <div className="mx-auto w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                TS
              </div>

              <h2 className="mt-6 text-3xl font-bold text-secondary">
                Create Acount
              </h2>

              <p className="text-gray-500 mt-2">
                Welcome to Titansports
              </p>

            </div>


            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

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

              </div>


              <div>

                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Mobile Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  placeholder="0-729-455-662"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />

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

              </div>

              

              <button
                className="w-full bg-orange-400 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
              >
                Login
              </button>

            </form>

            


          </div>

        </div>
    </div>
    );
}
