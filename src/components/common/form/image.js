import React, { useState } from "react";
import { Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageInput = ({ max = 1, name = "file" }) => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    // API তে ফাইল আপলোড করো
    // এখানে আমি প্রথম ফাইল নিয়ে দেখাচ্ছি
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      if (file) {
        const formData = new FormData();
        formData.append(name, file);

        try {
          const response = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              // Authorization: `Bearer ${your_token}`, // যদি লাগে
            },
          });

          const imageUrl = response.data.url;
          message.success("Image uploaded successfully!");
          console.log("Uploaded Image URL:", imageUrl);
          // এখানে তোমার দরকার হলে এই URL স্টেট বা ফর্মে সেট করতে পারো
        } catch (error) {
          message.error("Upload failed!");
          console.error(error);
        }
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={max > 1}
        maxCount={max}
      >
        {fileList.length >= max ? null : uploadButton}
      </Upload>
      <Image
        style={{ display: "none" }}
        preview={{
          visible: previewOpen,
          src: previewImage,
          onVisibleChange: (visible) => setPreviewOpen(visible),
        }}
      />
    </>
  );
};

export default ImageInput;
