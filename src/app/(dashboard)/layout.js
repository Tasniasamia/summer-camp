import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <FirebaseAuthProvider>
            {children}
            </FirebaseAuthProvider>
        </div>
    );
};

export default layout;