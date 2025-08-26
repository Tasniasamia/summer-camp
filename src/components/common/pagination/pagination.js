"use client";
import React from "react";
import { Pagination } from "antd";

const CustomPagination = ({ data, onPageChange }) => {
  return (
    <div className="flex justify-center mt-6">
      <Pagination
        current={data?.page || 1}        // এখন কোন পেজে আছি
        pageSize={data?.limit || 10}     // প্রতি পাতায় কয়টা item
        total={data?.totalDocs || 0}     // মোট কতগুলো item
        
        onChange={(page, pageSize) => {
          if (onPageChange) onPageChange(page, pageSize);
        }}
      />
    </div>
  );
};

export default CustomPagination;
