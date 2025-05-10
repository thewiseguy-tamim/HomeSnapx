import React from 'react';
import { Link } from 'react-router';


const SuccessAlert = () => {
    return (
        <div role="status" className="alert alert-success flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Account Activated</span>
            </div>
            <Link to="/login" className="btn btn-primary">
                Sign in
            </Link>
        </div>
    );
};

export default SuccessAlert;
