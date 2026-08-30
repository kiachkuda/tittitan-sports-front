'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';
import clsx from 'clsx';
import { useAuth } from '@/contexts/AuthProvider';
import { env } from 'node:process';
import Link from 'next/link';

export default function LoginForm() {

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const auth = useAuth();
  const setUser = auth.setUser;
  const setIsLoggedIn = auth.setIsLoggedIn

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Handle form submission logic here
    e.preventDefault();
    const form = e.currentTarget;

    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
   
    const API_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL 
        : process.env.NEXT_PUBLIC_API_URL;  

    // You can add your authentication logic here
    const res = await fetch(`${API_URL}/auth`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.ok) {
      const data = await res.json();

      setUser(data.user);
      setIsLoggedIn(true);

      console.log(data)
      
      setSuccess(true);

      router.push("/home");

    } else {
      const errorData = await res.json();
      setIsError(true);
      setError(errorData.error);
      setTimeout(() => {
        setIsError(false);
        setError('');
      },
        5000); // Clear error after 5 seconds
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
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to your Account
            </p>

          </div>


          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
            <span className={clsx(" m-auto p-2 text-xl rounded-2xl", isError && " bg-red-500 text-amber-50")}>{isError ? error : success}</span>
            <div className='mt-5'>



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
                Password
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  id="role"
                  name="role"
                  type="hidden"
                  value={'admin'}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                  type="button"

                  className="absolute right-4 top-3 text-gray-500 hover:text-primary"
                >
                  👁
                </button>

              </div>

            </div>

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2 text-gray-600">

                <input type="checkbox" />

                Remember me

              </label>

              <a href="#" className="text-primary font-medium hover:underline">
                Forgot Password?
              </a>

            </div>

            <button
              className="w-full bg-orange-400 hover:bg-orange-600 transition text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl"
            >
              Login
            </button>

          </form>

          <div className="my-8 flex items-center">

            <div className="flex-grow border-t"></div>

            <span className="mx-4 text-gray-400 text-sm">
              <Link href={"/signup"}>Create Account</Link>
            </span>

            <div className="flex-grow border-t"></div>

          </div>


        </div>

      </div>
    </div>
  );
}

