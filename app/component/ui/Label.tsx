import React from 'react';
import { cn } from '@/app/lib/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ children, required, className, ...props }) => {
  return (
    <label
      className={cn("text-sm font-medium text-gray-300", className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};

export default Label;
