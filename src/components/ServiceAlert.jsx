import React from 'react';
import { Link } from 'react-router';


const SuccessAlert = () => {
    return (
        <div role="status" className="alert alert-warning flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-center">
                    <span className="">If you can not see this section please log in to see..</span>
                </div>

            </div>
            
        </div>
    );
};

export default SuccessAlert;
