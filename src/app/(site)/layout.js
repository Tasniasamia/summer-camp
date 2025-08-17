import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import { Queries } from '@/helpers/context/quries';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
    return (
        <div>
            <Queries>
            <FirebaseAuthProvider>
             <Header/>
            {children}
            <Footer/>
            <Toaster/>
            </FirebaseAuthProvider>
            </Queries>
        </div>
    );
};

export default layout;