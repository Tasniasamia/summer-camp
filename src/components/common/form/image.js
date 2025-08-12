// import React, { useState } from "react";
// import { Upload, Image, message } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import axios from "axios";

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const ImageInput = ({ max = 1, name = "file" }) => {
//   const [fileList, setFileList] = useState([]);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//   };

//   const handleChange = async ({ fileList: newFileList }) => {
//     setFileList(newFileList);

//     // API তে ফাইল আপলোড করো
//     // এখানে আমি প্রথম ফাইল নিয়ে দেখাচ্ছি
//     if (newFileList.length > 0) {
//       const file = newFileList[0].originFileObj;
//       console.log("newfileList",newFileList);
//       if (file) {
//         const formData = new FormData();
// formData.append('file', file);

// const res = await fetch('/api/upload', {
//   method: 'POST',
//   body: formData,
// });
// const image=await res.json();
// console.log("image client",image);
      
        
    
//       }
//     }
//   };

//   const uploadButton = (
//     <div>
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </div>
//   );

//   return (
//     <>
//       <Upload
//         name={name}
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         multiple={max > 1}
//         maxCount={max}
//       >
//         {fileList.length >= max ? null : uploadButton}
//       </Upload>
//       <Image
//         style={{ display: "none" }}
//         preview={{
//           visible: previewOpen,
//           src: previewImage,
//           onVisibleChange: (visible) => setPreviewOpen(visible),
//         }}
//       />
//     </>
//   );
// };

// export default ImageInput;


import React, { useState } from "react";
import { Upload, Image, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

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
  const [uploadedFiles, setUploadedFiles] = useState([]); // track uploaded files by name
  const [responseImage,setResonseImage]=useState({});
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      if (file) {
        if (uploadedFiles.includes(file.name)) {
          toast.success("এই ফাইলটি ইতিমধ্যে আপলোড করা হয়েছে।");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const image = await res.json();

          if (res.ok) {
            toast.success("ছবি সফলভাবে আপলোড হয়েছে!");
            setUploadedFiles((prev) => [...prev, file.name]);
            console.log("Uploaded image info:", image);
            setResonseImage(image);
          } else {
            toast.error("ছবি আপলোডে সমস্যা হয়েছে!");
            console.error("Upload error:", image.error || image);
          }
        } catch (err) {
          toast.error("সার্ভারে সমস্যা হয়েছে!");
          console.error(err);
        }
      }
    }
  };
  const handleDelete = async () => {
    if (!responseImage.public_id) {
      toast.error("ডিলিট করার জন্য ফাইল পাওয়া যায়নি!");
      return;
    }
  
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: responseImage.public_id }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.success("ছবি সফলভাবে ডিলিট হয়েছে!");
        // UI update korte paren, jemon:
        setFileList([]);
        setUploadedFiles([]);
        setResonseImage({});
      } else {
        toast.error("ডিলিট করতে সমস্যা হয়েছে!");
        console.error(data);
      }
    } catch (error) {
      toast.error("সার্ভারে সমস্যা হয়েছে!");
      console.error(error);
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
        onRemove={handleDelete}
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
