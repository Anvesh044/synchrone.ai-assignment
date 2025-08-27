import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "processing" | "completed" | "error";
  className?: string;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "status-pending"
  },
  processing: {
    label: "Processing",
    className: "status-processing"
  },
  completed: {
    label: "Completed", 
    className: "status-completed"
  },
  error: {
    label: "Error",
    className: "status-error"
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-xs font-medium",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};