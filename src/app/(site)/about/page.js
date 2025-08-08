import Banner from '@/components/common/banner';
import AboutSection from '@/components/home/about';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner title="About"/>
            <AboutSection/>
        </div>
    );
};

export default page;