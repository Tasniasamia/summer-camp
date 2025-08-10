"use client";
import CommonTable from "@/components/common/table/table";
import Title from "@/components/common/title";
import { useRouter } from "next/navigation";

const page = () => {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Instructor", dataIndex: "instructor", key: "instructor" },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, d) => {
        return (
          <span className="line-clamp-1" title={d?.description}>
            {d?.description}
          </span>
        );
      },
    },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
      render: (days) => days.join(", "),
    },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Place", dataIndex: "place", key: "place" },
    { title: "Create Date", dataIndex: "createDate", key: "createDate" },
    { title: "Seats", dataIndex: "sit", key: "sit" },
    { title: "Enrollment", dataIndex: "enrollment", key: "enrollment" },
  ];

  const data = [
    {
      name: "Swimming & Water Sports",
      instructor: "Sarah Johnson",
      rate: 4.9,
      description:
        "Learn swimming techniques and enjoy water sports in our pristine lake with certified lifeguards.",
      duration: "2 hours",
      days: ["Mon", "Wed", "Fri"],
      time: "10:00 AM",
      place: "Pine Lake",
      createDate: "2025-08-10",
      sit: 10,
      enrollment: 8,
      category: "water",
    },
    {
      name: "Mountain Hiking",
      instructor: "David Carter",
      rate: 4.8,
      description:
        "Explore scenic trails and learn safe hiking techniques with an experienced guide.",
      duration: "4 hours",
      days: ["Tue", "Thu", "Sat"],
      time: "6:00 AM",
      place: "Evergreen Mountains",
      createDate: "2025-08-10",
      sit: 15,
      enrollment: 12,
      category: "adventure",
    },
    {
      name: "Yoga & Meditation",
      instructor: "Emily Brown",
      rate: 4.7,
      description:
        "Relax and strengthen your body with yoga poses followed by guided meditation.",
      duration: "1.5 hours",
      days: ["Mon", "Wed", "Fri"],
      time: "7:00 AM",
      place: "Sunrise Garden",
      createDate: "2025-08-10",
      sit: 20,
      enrollment: 18,
      category: "exercise",
    },
    {
      name: "Kayaking Adventure",
      instructor: "Michael Lee",
      rate: 4.85,
      description:
        "Paddle through calm and challenging waters with safety instructions and fun races.",
      duration: "3 hours",
      days: ["Sat", "Sun"],
      time: "9:00 AM",
      place: "Blue River",
      createDate: "2025-08-10",
      sit: 12,
      enrollment: 9,
      category: "adventure",
    },
    {
      name: "Cycling Tour",
      instructor: "Anna White",
      rate: 4.6,
      description:
        "Join a scenic cycling tour covering beautiful landscapes and safe riding practices.",
      duration: "2.5 hours",
      days: ["Tue", "Thu"],
      time: "5:00 PM",
      place: "Green Valley",
      createDate: "2025-08-10",
      sit: 25,
      enrollment: 21,
      category: "adventure",
    },
  ];
  const { push } = useRouter();
  return (
    <div>
      <Title
        title="Class"
        noBack={false}
        customComponent={
          <button
            type="primary"
            onClick={() => {
              push("/admin/class/add");
            }}
            htmlType="submit"
            className="px-4 cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-lg shadow-lg"
          >
            {" "}
            Add New Class
          </button>
        }
      />

      <CommonTable
        columns={columns}
        data={data}
        onView={(rec) => console.log("view", rec)}
        onEdit={(rec) => {
          retrun(push(`/admin/class/edit/${rec?.name}`));
        }}
        onDelete={(rec) => console.log(rec)}
      />
    </div>
  );
};

export default page;
