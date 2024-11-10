import { blog_data } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);

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
  

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  console.log(courses)
  console.log(categories)

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {
          categories.map(({ id, name }) => (
            <button
              key={id}
              className={
                menu === name ? "bg-black text-white py-1 px-4 rounded-sm" : ""
              }
              onClick={() => setMenu(name)}
            >
              {name}
            </button>
          ))
        }
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {courses
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <BlogItem
                key={index}
                id={item.id}
                image={item.imageUrl}
                title={item.title}
                description={item.description}
                category={item.category.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BlogList;
