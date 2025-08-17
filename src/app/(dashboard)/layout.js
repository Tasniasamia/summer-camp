import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import { Queries } from '@/helpers/context/quries';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
    return (
        <div>
            <Queries>
            <FirebaseAuthProvider>
            {children}
            <Toaster/>
            </FirebaseAuthProvider>
            </Queries>
        </div>
    );
};

export default layout;