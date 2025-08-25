"use client";
import CommonTable from "@/components/common/table/table";
import Title from "@/components/common/title";
import { useFetch } from "@/helpers/utils/queries";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const {
    data: getClass,
    isLoading: loadingClasses,
    error: errClasses,
  } = useFetch("class", "/class", { page, limit, search });

  const {
    data: users,
    isLoading: loadingUsers,
    error: errUsers,
  } = useFetch("user", "/getUsers");


  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Instructor",
      dataIndex: "instructorId",
      key: "instructor",
      render: (_, record) => {
        const instructor = users?.find((u) => u.id === record.instructorId);
        return (
          <span className="line-clamp-1" title={instructor?.description}>
            {instructor?.name || "N/A"}
          </span>
        );
      },
    },
    { title: "Rate", dataIndex: "rate", key: "rate" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (_, d) => {
        return <span>{dayjs(d?.time).format("HH:mm:ss")}</span>;
      },
    },
    { title: "Place", dataIndex: "place", key: "place" },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createdAt",
      render: (_, d) => {
        return <span>{dayjs(d?.createdAt).format("YYYY-MMM-DD")}</span>;
      },
    },
    { title: "Seats", dataIndex: "sit", key: "sit" },
    { title: "Enrollment", dataIndex: "enrollment", key: "enrollment" },
  ];

  // Pagination handler
  const handlePageChange = (newPage, newLimit) => {
    setPage(newPage);
    setLimit(newLimit);
  };

  return (
    <div>
      <Title
        title="Class"
        noBack={false}
        customComponent={
          <button
            type="button"
            onClick={() => router.push("/admin/class/add")}
            className="px-4 cursor-pointer text-white h-12 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 border-0 hover:from-yellow-600 hover:to-orange-600 font-semibold text-base"
          >
            Add New Class
          </button>
        }
      />

      <CommonTable
        columns={columns}
        isSearch={true}
        data={getClass?.data}
        loading={loadingClasses || loadingUsers}
        onView={(rec) => router.push(`/admin/class/${rec?.name}`)}
        onEdit={(rec) => router.push(`/admin/class/edit/${rec?.name}`)}
        onDelete={(rec) => console.log("Delete:", rec)}
        pagination={true}
        onPageChange={handlePageChange}
        setSearch={setSearch}
      />
    </div>
  );
};

export default Page;
