import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default layout;