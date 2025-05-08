import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ErrorAlert from '../ErrorAlert';
import apiClient from '../../Services/api-client';

const ActivateAccount = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { uid, token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        apiClient
            .post(`/users/activate/${uid}/${token}/`)
            .then(() => {
                setMessage("Account activated successfully! You can now log in.");
                setTimeout(() => navigate('/login'), 500); 
            })
            .catch((error) => {
                setError("Failed to activate account. Please try again.");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [uid, token, navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="card bg-base-100 shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Activate Your Account</h2>

                {loading && <p className="mb-4">Activating your account, please wait...</p>}

                {!loading && message && (
                    <div role="alert" className="alert alert-success mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Account Activated</span>
                    </div>
                )}

                {!loading && error && (
                    <ErrorAlert message={error} />
                )}
            </div>
        </div>
    );
};

export default ActivateAccount;
