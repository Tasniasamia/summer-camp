import Image from 'next/image';
import React from 'react';
import {
    FaHeart,
    FaUsers,
    FaClock,
    FaStar,
    FaCalendarAlt,
    FaMapMarkerAlt,
  } from "react-icons/fa";

const ClassCard = ({classItem,wishlist,enrolledClasses}) => {
    return (
        <div
        className="group hover:shadow-2xl transition-all duration-300 border border-gray-100 rounded-lg shadow-sm overflow-hidden"
      >
        <div className="relative">
          <Image
            src="/happy-campers.png"
            alt={classItem.title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(classItem.id)}
            aria-label="Toggle wishlist"
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <FaHeart
              className={`w-5 h-5 transition-colors ${
                wishlist.includes(classItem.id) ? 'text-red-500 fill-current' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Level Badge */}
          <span className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold select-none">
            {classItem.level}
          </span>

          {/* Price */}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold select-none">
            ${classItem.price}/session
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{classItem.title}</h3>
              <p className="text-gray-600 text-sm mb-3">with {classItem.instructor}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar />
              <span className="text-sm font-medium text-gray-900">{classItem.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">{classItem.description}</p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaClock />
              <span>{classItem.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers />
              <span>
                {classItem.enrolled}/{classItem.capacity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span className="text-xs">{classItem.schedule}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt />
              <span className="text-xs">{classItem.location}</span>
            </div>
          </div>

          {/* Enrollment Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Enrollment</span>
              <span className="font-medium">
                {classItem.enrolled}/{classItem.capacity} spots
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => enrollInClass(classItem.id)}
              disabled={
                enrolledClasses.includes(classItem.id) || classItem.enrolled >= classItem.capacity
              }
              className={`flex-1 text-white py-2 rounded-lg font-semibold transition ${
                enrolledClasses.includes(classItem.id)
                  ? 'bg-gray-400 cursor-default'
                  : classItem.enrolled >= classItem.capacity
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              }`}
            >
              {enrolledClasses.includes(classItem.id)
                ? 'Enrolled ✓'
                : classItem.enrolled >= classItem.capacity
                ? 'Full'
                : 'Enroll Now'}
            </button>
            <button
              className="flex-1 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-2 rounded-lg font-semibold transition"
              type="button"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );
};

export default ClassCard;