import React from 'react';
import { Link } from 'react-router-dom';

const ErrorAlert = ({ message = "An error occurred. Please try again or contact support.", onClose }) => {
  return (
    <div role="alert" className="alert alert-error flex flex-col items-start gap-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current text-red-500" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <div className="text-center">
          <span className="font-semibold">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-700 hover:text-red-900 focus:outline-none"
            aria-label="Close alert"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <Link
        to="/contact"
        className="text-sm text-red-600 hover:text-red-800 underline"
      >
        Contact Support
      </Link>
    </div>
  );
};

export default ErrorAlert;