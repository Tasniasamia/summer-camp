"use client";
import { useState } from "react";
import {FaHeart} from "react-icons/fa";
import ClassCard from "../common/card/classCard";

export default function ClassesSection() {
  const [wishlist, setWishlist] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  const toggleWishlist = (classId) => {
    setWishlist((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const enrollInClass = (classId) => {
    if (!enrolledClasses.includes(classId)) {
      setEnrolledClasses((prev) => [...prev, classId]);
    }
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
    { id: "all", label: "All Classes", count: classes.length },
    {
      id: "water",
      label: "Water Sports",
      count: classes.filter((c) => c.category === "water").length,
    },
    {
      id: "adventure",
      label: "Adventure",
      count: classes.filter((c) => c.category === "adventure").length,
    },
    {
      id: "sports",
      label: "Sports",
      count: classes.filter((c) => c.category === "sports").length,
    },
    {
      id: "creative",
      label: "Creative",
      count: classes.filter((c) => c.category === "creative").length,
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredClasses =
    activeCategory === "all"
      ? classes
      : classes.filter((c) => c.category === activeCategory);

  return (
    <section id="classes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-800 hover:bg-blue-200 mb-4 px-4 py-1 rounded-full cursor-default">
            Camp Classes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`font-medium py-2 rounded-xl transition-colors ${
                activeCategory === category.id
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-700 hover:bg-white hover:text-blue-600"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((classItem,index) => (
            <ClassCard classItem={classItem} key={index} wishlist={wishlist} setWishlist={setWishlist} enrolledClasses={enrolledClasses} setEnrolledClasses={setEnrolledClasses}/>
          ))}
        </div>

        {/* Wishlist Summary */}
        {wishlist.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaHeart className="w-6 h-6 text-pink-500 fill-current" />
                <div>
                  <h3 className="font-semibold text-gray-900">Your Wishlist</h3>
                  <p className="text-sm text-gray-600">
                    {wishlist.length} class{wishlist.length !== 1 ? "es" : ""}{" "}
                    saved
                  </p>
                </div>
              </div>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition">
                View Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
