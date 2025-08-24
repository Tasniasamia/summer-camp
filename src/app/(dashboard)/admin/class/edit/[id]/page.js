"use client";
import Title from "@/components/common/title";
import ClassForm from "../../component/form";
import { useParams } from "next/navigation";


const page = ({params}) => {
    const {id}=useParams();
    return (
        <div>
            <Title title="Update Class"/>
            <ClassForm id={id}/>
        </div>
    );
};

export default page;