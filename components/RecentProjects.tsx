"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data"; // You might want to remove this if not used.
import { PinContainer } from "./ui/Pin";
import { useEffect, useState } from "react";
import Link from "next/link";

// Define the Course type
export type Course = {
  id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  isPublished: boolean;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  chapters: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    position: number;
    isPublished: boolean;
    isFree: boolean;
    courseId: string;
    createdAt: string;
    updatedAt: string;
  }[];
  iconLists: string[]; // Assuming icon lists are arrays of URLs to icons
};

const RecentProjects = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch courses from the API
  const fetchCourses = async () => {
    try {
      const response = await fetch("/api/courses", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Failed to fetch courses");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(courses.map(course => course.category.name)));

  // Filter courses based on the selected category
  const filteredCourses = selectedCategory 
    ? courses.filter(course => course.category.name === selectedCategory) 
    : courses;

  return (
    <div className="py-20">
      <h1 className="heading">
        Наши <span className="text-purple">курсы</span>
      </h1>

      {/* Category Tabs */}
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={() => setSelectedCategory(null)} 
          className={`py-2 px-4 rounded ${selectedCategory === null ? "bg-purple text-white" : "bg-gray-200 text-black"}`}
        >
          Все
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded ${selectedCategory === category ? "bg-purple text-white" : "bg-gray-200 text-black"}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 min-[900px]:grid-cols-2 min-[1320px]:grid-cols-3 p-4 gap-16 mt-10">
        {filteredCourses.map(item => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center"
            key={item.id}
          >
            <Link href={`/ogogo/${item.id}`}>
              <PinContainer
                title={`${item.category.name}`}
                href={`/ogogo/${item.id}`}
              >
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[200px] lg:h-[200px] mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <img src="/bg.png" alt="bgimg" />
                  </div>
                  <img
                    src={item.imageUrl}
                    alt="cover"
                    className=""
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                  dangerouslySetInnerHTML={{ __html: `${item.description.substring(0, 100)}...` }}
                >
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex justify-center items-center">
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Узнать больше
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </div>
                </div>
              </PinContainer>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
