/* eslint-disable @next/next/no-img-element */
"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Banner = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useGSAP(() => {
    gsap.to("#heading", { opacity: 1, delay: 1, y: -20 });
    gsap.to("#desc", { opacity: 1, delay: 1.2, y: -10 });
    gsap.to("#form", { opacity: 1, delay: 1.4, y: -10 });
    gsap.to(".compo", { opacity: 1, delay: 1.3, y: -10 });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit');
      }

      setSuccess(true);
      setEmail("");
      setPhone("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (success || error) {
      timer = setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 5000); // 5 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    }; // Cleanup timer on unmount
  }, [success, error]);

  return (
    <main style={{ background: 'rgb(0, 0, 0)' }} className="h-screen">
      <div className="relative px-6 lg:px-8">
        <svg style={{ transform: 'translateX(-50%)' }} className="absolute left-1/2 top-20" width="90" height="58.696" viewBox="0 0 90 58.696" xmlns="http://www.w3.org/2000/svg">
          <path d="M53.812 30.052 46.33 10.724a0.88 0.88 0 0 0 -0.423 -0.501 1.115 1.115 0 0 0 -0.593 -0.155q-0.763 0 -1.013 0.659l-7.4 19.354 -4.946 0.01 8.198 -21.173q0.591 -1.589 1.941 -2.363 1.393 -0.777 3.213 -0.781 1.775 0 3.172 0.769 1.397 0.771 1.992 2.356l8.29 21.146z" fill="#009B95"/>
          <path d="M21.469 10.667c1.943 0 3.843 0.528 5.459 1.514a9.196 9.196 0 0 1 3.62 4.034c0.743 1.643 0.937 3.451 0.558 5.195a8.804 8.804 0 0 1 -2.69 4.604 10.174 10.174 0 0 1 -5.03 2.459 10.683 10.683 0 0 1 -5.678 -0.513 9.685 9.685 0 0 1 -4.408 -3.312 8.452 8.452 0 0 1 -1.655 -4.995c0.004 -2.385 1.043 -4.67 2.886 -6.355s4.343 -2.632 6.952 -2.632zM21.481 0c-4.248 0 -8.401 1.154 -11.935 3.312C6.014 5.474 3.262 8.544 1.636 12.134a18.098 18.098 0 0 0 -1.223 11.358c0.83 3.811 2.876 7.313 5.879 10.062 3.005 2.749 6.832 4.619 11 5.378a23.341 23.341 0 0 0 12.41 -1.119c3.927 -1.487 7.28 -4.007 9.64 -7.239 2.362 -3.234 3.62 -7.034 3.62 -10.921 0 -2.581 -0.556 -5.136 -1.636 -7.521a19.565 19.565 0 0 0 -4.657 -6.376A21.717 21.717 0 0 0 29.7 1.497a23.283 23.283 0 0 0 -8.217 -1.495" fill="#FF7A00"/>
          <path d="M68.521 10.663c1.945 0 3.845 0.528 5.459 1.516a9.196 9.196 0 0 1 3.62 4.034c0.743 1.643 0.939 3.451 0.558 5.195a8.804 8.804 0 0 1 -2.688 4.604A10.174 10.174 0 0 1 70.435 28.471a10.683 10.683 0 0 1 -5.676 -0.513 9.685 9.685 0 0 1 -4.41 -3.312 8.452 8.452 0 0 1 -1.653 -4.995c0.004 -2.383 1.039 -4.666 2.882 -6.351 1.841 -1.685 4.338 -2.633 6.942 -2.635m0 -10.663c-4.248 0 -8.401 1.152 -11.935 3.31 -3.533 2.16 -6.286 5.23 -7.912 8.822a18.098 18.098 0 0 0 -1.223 11.356c0.83 3.813 2.876 7.315 5.879 10.064 3.003 2.747 6.832 4.619 11 5.378s8.485 0.368 12.41 -1.119 7.28 -4.007 9.64 -7.239C88.742 27.34 90 23.537 90 19.651c0 -5.212 -2.262 -10.209 -6.29 -13.895S74.219 0 68.521 0" fill="#FF7A00"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M57.217 56.367a26.53 26.53 0 0 1 -9.235 -6.613l7.844 -6.717a16.043 16.043 0 0 0 5.613 4.007 17.804 17.804 0 0 0 7.083 1.454 17.804 17.804 0 0 0 7.083 -1.454 16.043 16.043 0 0 0 5.611 -4.007l7.842 6.717a26.511 26.511 0 0 1 -9.235 6.613A28.467 28.467 0 0 1 68.523 58.696a28.467 28.467 0 0 1 -11.305 -2.328" fill="#FF7A00"/>
        </svg>

        <div className="h-screen grid place-items-center mx-auto max-w-5xl pt-56 sm:pb-24 sm:pt-40">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-white opacity-0" id="heading">
              Открой для себя мир новых возможностей!
            </h1>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl leading-8 text-white opacity-0" id="desc">
              Развивайте свои навыки на наших курсах и учитесь у наставников из ведущих мировых компаний.
            </p>
            {/* Form for email and phone */}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 opacity-0" id="form">
              <input
                type="email"
                placeholder="Ваш Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
              />
              <input
                type="tel"
                placeholder="Ваш телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full sm:w-auto"
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-black bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </form>

            {error && <div className="text-red-500 mt-5">{error}</div>}
            {success && <div className="text-green-500 mt-5">Cпасибо! Мы получили ваши данные.</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Banner;
