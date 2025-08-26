"use client";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import ClassCard from "../common/card/classCard";
import { useFetch } from "@/helpers/utils/queries";
import CustomPagination from "../common/pagination/pagination";
import { Empty } from "antd";

export default function ClassesSection() {
  const { data, isLoading, error } = useFetch("class", "/getClasses");
  const [currentPage, setCurrentPage] = useState(1);
  console.log("classdata", data);

  const handlePageChange = (page) => {
    setCurrentPage(page); // শুধু state update হবে
  };

  const classes = [
    {
      id: 1,
      title: "Swimming & Water Sports",
      category: "water",
      instructor: "Sarah Johnson",
      image: "/swimming-class.png",
      duration: "2 hours",
      capacity: 12,
      enrolled: 8,
      rating: 4.9,
      price: 45,
      level: "All Levels",
      description:
        "Learn swimming techniques and enjoy water sports in our pristine lake with certified lifeguards.",
      schedule: "Mon, Wed, Fri - 10:00 AM",
      location: "Pine Lake",
    },
    {
      id: 2,
      title: "Skateboarding Basics",
      category: "sports",
      instructor: "Mike Rodriguez",
      image: "/skateboarding-class.png",
      duration: "1.5 hours",
      capacity: 10,
      enrolled: 6,
      rating: 4.8,
      price: 35,
      level: "Beginner",
      description:
        "Master the fundamentals of skateboarding with safety gear and expert guidance.",
      schedule: "Tue, Thu - 2:00 PM",
      location: "Skate Park",
    },
    {
      id: 3,
      title: "Rock Climbing Adventure",
      category: "adventure",
      instructor: "Alex Chen",
      image: "/rock-climbing-class.png",
      duration: "3 hours",
      capacity: 8,
      enrolled: 5,
      rating: 5.0,
      price: 60,
      level: "Intermediate",
      description:
        "Challenge yourself with guided rock climbing sessions on our natural rock formations.",
      schedule: "Sat, Sun - 9:00 AM",
      location: "Rocky Ridge",
    },
    {
      id: 4,
      title: "Arts & Crafts Studio",
      category: "creative",
      instructor: "Emma Wilson",
      image: "/arts-crafts-class.png",
      duration: "2 hours",
      capacity: 15,
      enrolled: 12,
      rating: 4.7,
      price: 30,
      level: "All Levels",
      description:
        "Express your creativity through various art projects and craft activities.",
      schedule: "Daily - 1:00 PM",
      location: "Art Studio",
    },
    {
      id: 5,
      title: "Canoeing & Kayaking",
      category: "water",
      instructor: "David Park",
      image: "/canoeing-class.png",
      duration: "2.5 hours",
      capacity: 10,
      enrolled: 7,
      rating: 4.9,
      price: 50,
      level: "Beginner",
      description:
        "Explore the lake while learning proper paddling techniques and water safety.",
      schedule: "Mon, Wed, Fri - 3:00 PM",
      location: "Boat Dock",
    },
    {
      id: 6,
      title: "Mountain Biking",
      category: "adventure",
      instructor: "Lisa Thompson",
      image: "/mountain-biking-class.png",
      duration: "2 hours",
      capacity: 12,
      enrolled: 9,
      rating: 4.8,
      price: 40,
      level: "Intermediate",
      description:
        "Navigate forest trails and improve your biking skills with professional instruction.",
      schedule: "Tue, Thu, Sat - 4:00 PM",
      location: "Forest Trails",
    },
  ];

  const categories = [
    { label: "All", value: "all" },
    { label: "Water", value: "water" },
    { label: "Mountain", value: "mountain" },
    { label: "Yoga", value: "yoga" },
    { label: "Adventure", value: "adventure" },
    { label: "Cycling", value: "cycling" },
  ];
  const [activeCategory, setActiveCategory] = useState("all");
  console.log("activeCategory", activeCategory);

  const filteredClasses =
    activeCategory === "all"
      ? data?.data?.docs
      : data?.data?.docs?.filter(
          (c) => c?.category == activeCategory.toLowerCase()
        );
  console.log("filteredClasses", filteredClasses);
  return (
    <section id="classes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-800 hover:bg-orange-200 mb-4 px-4 py-1 rounded-full cursor-default">
            Camp Classes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
              Passion
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our wide variety of exciting classes led by expert
            instructors. Build skills, make friends, and create unforgettable
            memories.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="w-full mb-12 grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-100 p-1 rounded-xl select-none">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category?.value)}
              className={`font-medium py-2 rounded-xl transition-colors ${
                activeCategory === category?.value
                  ? "bg-white text-orange-600 shadow"
                  : "text-gray-700 hover:bg-white hover:text-orange-600"
              }`}
            >
              {category?.label}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        {filteredClasses?.length === 0 ? (
          <Empty description="No Class" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClasses?.map((classItem, index) => (
              <ClassCard classItem={classItem} key={index} />
            ))}
          </div>
        )}

        <CustomPagination data={data?.data} onPageChange={handlePageChange} />
      </div>
    </section>
  );
}
