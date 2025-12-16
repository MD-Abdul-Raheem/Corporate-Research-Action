import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, hover = false, ...props }) => {
  return (
    <div 
      className={`
        rounded-xl border border-slate-200/60 bg-white 
        shadow-sm transition-all duration-300 ease-out
        ${hover ? 'hover:shadow-soft hover:border-primary/40 hover:-translate-y-0.5 cursor-pointer' : ''}
        ${className || ''}
      `} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return <div className={`flex flex-col space-y-1.5 p-6 pb-3 ${className || ''}`} {...props}>{children}</div>;
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return <h3 className={`font-heading font-semibold leading-tight tracking-tight text-lg text-slate-900 ${className || ''}`} {...props}>{children}</h3>;
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return <div className={`p-6 pt-0 ${className || ''}`} {...props}>{children}</div>;
};