import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
    return (
        <div>
            <FirebaseAuthProvider>
             <Header/>
            {children}
            <Footer/>
            <Toaster/>
            </FirebaseAuthProvider>
        </div>
    );
};

export default layout;