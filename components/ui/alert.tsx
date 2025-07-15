import * as React from "react";

export function Alert({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded">
      {children}
    </div>
  );
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>;
} 