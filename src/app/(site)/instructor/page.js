import Banner from '@/components/common/banner';
import InstructorsSection from '@/components/home/instructorSection';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner title="Instructor"/>
            <InstructorsSection/>
        </div>
    );
};

export default page;