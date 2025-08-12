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
      console.log("newfileList",newFileList);
      if (file) {
        const formData = new FormData();
        formData.append(name, file); // এখানে name হচ্ছে "file"
        formData.append('upload_preset', 'first_preset'); // ঠিক করা হয়েছে
        formData.append('cloud_name', 'dtjf2nn9o');
        
        const res = await fetch(`https://api.cloudinary.com/v1_1/dtjf2nn9o/image/upload`, {
          method: "POST",
          body: formData
        });
        
        const image = await res.json();
        console.log("image", image);
        
    
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
