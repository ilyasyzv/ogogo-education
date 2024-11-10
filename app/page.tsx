// "use client";
// import Banner from "./components/Banner/Banner";
// import Companies from "./components/Companies/Companies";
// import Tabs from "./components/Courses/Courses";
// import Mentor from "./components/Mentor/Mentor";
// import Students from "./components/Students/Students";
// import Newsletter from "./components/Newsletter/Newsletter";
// import Navbar from "./components/Navbar/Navbar";
// import BlogList from "@/components/BlogList";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// async function page() {
//   return (
//     <>
//       <ToastContainer theme="dark" />
//       <Header />
//       <BlogList />
//       <Footer />
//     </>
//   );
// }

// export default page;

"use client";

import { navItems } from "@/data";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Banner from "./components/Banner/Banner";

const Home = () => {
  return (
    <>
      <nav>
        <Banner />
      </nav>
      <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="max-w-7xl w-full">
          {/* <FloatingNav navItems={navItems} />
          <Hero /> */}
          <Grid />
          <RecentProjects />
          <Clients />
          <Experience />
          <Approach />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Home;