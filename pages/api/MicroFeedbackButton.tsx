import { ButtonHTMLAttributes, forwardRef } from 'react';

interface MicroFeedbackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const MicroFeedbackButton = forwardRef<HTMLButtonElement, MicroFeedbackButtonProps>(
  ({ children, variant = 'primary', className = '', ...props }, ref) => {
    const baseClasses = 'px-6 py-3 font-semibold rounded-md transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
    const variantClasses = {
      primary: 'bg-red-600 text-white hover:bg-red-500 hover:scale-105 focus:ring-red-500',
      secondary: 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105 focus:ring-gray-600',
    };

    return (
      <button ref={ref} className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }
);

MicroFeedbackButton.displayName = 'MicroFeedbackButton';