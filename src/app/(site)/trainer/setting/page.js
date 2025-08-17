"use client";
import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Card,
  Tabs,
  message,
  Row,
  Col,
  Space,
} from "antd";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCamera } from "react-icons/fa";
import ImageInput from "@/components/common/form/image";
const { TextArea } = Input;

export default function FormsPage() {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Profile form submission
  const onProfileFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Profile form values:", values);
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };


  const onPasswordFinish = async (values) => {
    setPasswordLoading(true);
    try {
        await resetPassword(values?.email);
        toast.success("Please check  your email");

    } catch (error) {
      toast.error("Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };
  const ProfileForm = () => (
    <Card title="Profile Information" className="w-full">
      <Form
        form={profileForm}
        layout="vertical"
        onFinish={onProfileFinish}
        initialValues={{
          name: "",
          email: "",
          phone: "",
          address: "",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Profile Picture"
              name="image"
              rules={[{ required: true, message: "Please upload an image!" }]}
            >
              <ImageInput max={1} name="image" />
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                    { min: 2, message: "Name must be at least 2 characters!" },
                  ]}
                >
                  <Input
                    prefix={<FaUser className="w-4 h-4" />}
                    placeholder="Enter your full name"
                    size="large"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<FaEnvelope className="w-4 h-4" />}
                    placeholder="Enter your email"
                    size="large"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                {
                  pattern: /^[0-9+\-\s()]+$/,
                  message: "Please enter a valid phone number!",
                },
              ]}
            >
              <Input
                prefix={<FaPhone className="w-4 h-4" />}
                placeholder="Enter your phone number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please enter your address!" },
                { min: 10, message: "Address must be at least 10 characters!" },
              ]}
            >
              <TextArea
                placeholder="Enter your full address"
                rows={3}
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className="mb-0 pt-6">
          <Space>
            <button
              type="primary"
              htmlType="submit"
              className="w-full text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base px-4 shadow-lg"
            >
              {" "}
              Update Profile
            </button>
            <button
              type="primary"
              htmlType="submit"
              onClick={() => passwordForm.resetFields()}

              className="w-full px-4  cursor-pointer h-12 rounded-lg border border-gray-200 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Reset
            </button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );

  const PasswordForm = () => (
    <Card title="Change Password" className="w-full">
      <Form form={passwordForm} layout="vertical" onFinish={onPasswordFinish}>
        <Row gutter={16}>
          <Col xs={24} md={24}>
          <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    prefix={<FaEnvelope className="w-4 h-4" />}
                    placeholder="Enter your email"
                    size="large"
                  />
                </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">
                Password Requirements:
              </h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• At least 8 characters long</li>
                <li>• Contains uppercase letter (A-Z)</li>
                <li>• Contains lowercase letter (a-z)</li>
                <li>• Contains at least one number (0-9)</li>
                <li>• Different from current password</li>
              </ul>
            </div>
          </Col>
        </Row>

        <Form.Item className="mb-0 pt-6">
          <Space>
            <button
              type="primary"
              htmlType="submit"
              className="w-full px-4 text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Change Password
            </button>
            <button
              type="primary"
              htmlType="submit"
              onClick={() => passwordForm.resetFields()}

              className="w-full px-4  cursor-pointer h-12 rounded-lg border border-gray-200 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base shadow-lg"
            >
              {" "}
              Reset
            </button>
            </Space>
        </Form.Item>
      </Form>
    </Card>
  );

  const tabItems = [
    {
      key: "1",
      label:(<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 font-bold">Profile Information</span>),
      children: <ProfileForm />,
    },
    {
      key: "2",
      label:(<span className="text-transparent font-bold bg-clip-text bg-gradient-to-r  from-orange-500 to-yellow-500">Change Password</span>),
      children: <PasswordForm />,
    },
  ];

  return (
    <div className="bg-gray-50">
      <div>
      

        <Tabs
          centered
          defaultActiveKey="1"
          items={tabItems}
          size="large"
          className="bg-white rounded-lg shadow-sm bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 "
        />
      </div>
    </div>
  );
}
