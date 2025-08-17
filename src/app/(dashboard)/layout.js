import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
    return (
        <div>
            <FirebaseAuthProvider>
            {children}
            <Toaster/>
            </FirebaseAuthProvider>
        </div>
    );
};

export default layout;