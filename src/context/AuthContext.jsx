import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { loginUser, registerUser, user, logoutUser, updateUserProfile, changePassword } = useAuth();  

    return (
        <AuthContext.Provider value={{ loginUser, registerUser, user, logoutUser, updateUserProfile, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
