import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import React from 'react';
// import { AntdRegistry } from '@ant-design/nextjs-registry';

const layout = ({children}) => {
    return (
        <div>
            {/* <AntdRegistry> */}
            <FirebaseAuthProvider>
             <Header/>
            {children}
            <Footer/>
            </FirebaseAuthProvider>
            {/* </AntdRegistry> */}
        </div>
    );
};

export default layout;