"use client";
import React, { useState, useRef } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  DatePicker,
} from "antd";
import JoditEditor from 'jodit-react';
import ImageInput from "@/components/common/form/image";

const { Option } = Select;

const categories = [
  { label: "Water", value: "water" },
  { label: "Mountain", value: "mountain" },
  { label: "Yoga", value: "yoga" },
  { label: "Adventure", value: "adventure" },
  { label: "Cycling", value: "cycling" },
];

const daysOptions = [
  { label: "Monday", value: "Mon" },
  { label: "Tuesday", value: "Tue" },
  { label: "Wednesday", value: "Wed" },
  { label: "Thursday", value: "Thu" },
  { label: "Friday", value: "Fri" },
  { label: "Saturday", value: "Sat" },
  { label: "Sunday", value: "Sun" },
];

const ClassForm = () => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [description, setDescription] = useState("");
  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      time: values.time.format("HH:mm"),
      createDate: values.createDate.format("YYYY-MM-DD"),
      description,
    };
    console.log("Form values:", formattedValues);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 p-6 sm:p-4 shadow-2xl">
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        days: [],
        category: undefined,
      }}
    >
      <Form.Item
        label="Upload Image"
        name="image"
        rules={[{ required: true, message: 'Please upload an image!' }]}
      >
        <ImageInput max={1} name="image" />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the class name" }]}
      >
        <Input placeholder="Enter class name" />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select
          placeholder="Select category"
          options={categories}
          allowClear
        />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        required
      >
        <InputNumber min={0} max={5}  style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Instructor"
        name="instructor"
        rules={[{ required: true, message: "Please input the instructor name" }]}
      >
        <Input placeholder="Enter instructor name" />
      </Form.Item>

      <Form.Item
        label="Rate"
        name="rate"
      >
        <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Description" >
        <JoditEditor
          ref={editor}
          value={description}
          tabIndex={1}
          onBlur={(newContent) => setDescription(newContent)}
          onChange={() => {}}
        />
      </Form.Item>

      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Please input the duration" }]}
      >
        <Input placeholder="e.g. 2 hours" />
      </Form.Item>

      <Form.Item
        label="Days"
        name="days"
        rules={[{ required: true, message: "Please select days" }]}
      >
        <Select
          mode="multiple"
          placeholder="Select days"
          options={daysOptions}
          allowClear
        />
      </Form.Item>

      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: "Please select time" }]}
      >
        <TimePicker format="HH:mm" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Place"
        name="place"
        rules={[{ required: true, message: "Please input the place" }]}
      >
        <Input placeholder="Enter place" />
      </Form.Item>

      <Form.Item
        label="Create Date"
        name="createDate"
        rules={[{ required: true, message: "Please select create date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Seats"
        name="sit"
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Enrollment"
        name="enrollment"
        rules={[{ required: true, message: "Please input enrollment count" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

     

      <Form.Item>
        <button type="primary" htmlType="submit" className="w-full text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-lg shadow-lg"
>        Save
        </button>
      </Form.Item>
    </Form>
    </div>

  );
};

export default ClassForm;
