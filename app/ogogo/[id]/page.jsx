"use client";
import { assets } from "@/assets/assets";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const [data, setData] = useState(null); // Initialize as null to check loading state
  const [loading, setLoading] = useState(true); // State to track loading status
  const [openIndex, setOpenIndex] = useState(null); // State for accordion

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`/api/courses/${params.id}`);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error("Failed to fetch course data");
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="w-[800px] mx-auto mt-10">
      <div className="bg-gray-800 h-40 w-full animate-pulse rounded-md mb-6"></div>
      <div className="bg-gray-800 h-8 w-full animate-pulse rounded-md mb-4"></div>
      <div className="bg-gray-800 h-5 w-3/4 animate-pulse rounded-md mb-2"></div>
      <div className="bg-gray-800 h-5 w-3/4 animate-pulse rounded-md mb-2"></div>
      <div className="bg-gray-800 h-5 w-3/4 animate-pulse rounded-md mb-2"></div>
    </div>
  );

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-center items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              alt=""
              width={90}
              className="w-[40px] sm:w-[60px] pt-10"
            />
          </Link>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-100px mb-10">
        <div className="grid place-items-center">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 row-span-5 mt-10 sm:grid-cols-2">
              <h1 className="text-4xl mb-10 sm:text-5xl sm:mb-0 font-semibold max-w-[700px] mx-auto">
                {data.title}
              </h1>
              <Image
                src={data.imageUrl}
                width={400}
                height={200}
                alt={data.title}
                className="border-4 border-white shadow-lg rounded-lg"
              />
            </div>
          )}
        </div>

        <div
          className="blog-content my-6 text-white"
          dangerouslySetInnerHTML={{
            __html: loading ? "<div class='bg-gray-800 h-20 animate-pulse rounded-md'></div>" : data.description,
          }}
        ></div>

        <div className="mt-10 pb-40">
          <h2 className="text-1xl sm:text-2xl font-semibold max-w-[700px] mb-5 text-white">
            Программа обучения
          </h2>
          <ul className="list-none space-y-3">
            {loading
              ? [1, 2, 3].map((_, index) => (
                  <li key={index} className="bg-gray-800 p-4 rounded-md shadow-md animate-pulse">
                    <div className="h-6 bg-gray-700 rounded-md mb-2"></div>
                  </li>
                ))
              : data.chapters?.map((item, index) => (
                  <li key={index} onClick={() => toggleAccordion(index)} className="bg-gray-800 rounded-md shadow-md cursor-pointer">
                    <button
                      type="button" // Ensure the button type is set
                      className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-semibold text-lg text-white">{item.title}</span>
                      <span className={`ml-2 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {openIndex === index && (
                      <div className="text-gray-300">
                        <div className="p-4 pl-8" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                      </div>
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
