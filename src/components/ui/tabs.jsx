import React from "react";
import { cn } from "../../lib/utils";

export function Tabs({ value, onValueChange, children, className }) {
  return (
    <div className={cn("w-full", className)} data-value={value}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { value, onValueChange });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { value });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, value, onValueChange }) {
  return <div className='inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground'>{React.Children.map(children, (child) => React.cloneElement(child, { value, onValueChange }))}</div>;
}

export function TabsTrigger({ value: itemValue, children, value, onValueChange }) {
  const active = value === itemValue;
  return (
    <button onClick={() => onValueChange(itemValue)} className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", active ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground")}>
      {children}
    </button>
  );
}

export function TabsContent({ value: itemValue, value, children, className }) {
  if (value !== itemValue) return null;
  return <div className={cn("mt-2", className)}>{children}</div>;
}
