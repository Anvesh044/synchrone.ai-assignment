import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { ProgressBar } from "./ProgressBar";
import { FileText, Calendar, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contract {
  id: string;
  title: string;
  parties: string[];
  status: "pending" | "processing" | "completed" | "error";
  confidenceScore?: number;
  uploadDate: string;
  financialValue?: string;
  processingProgress?: number;
}

interface ContractCardProps {
  contract: Contract;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const ContractCard = ({ contract, onClick, className, style }: ContractCardProps) => {
  return (
    <Card 
      className={cn(
        "card-hover gradient-card border-border/50",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      style={style}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{contract.title}</CardTitle>
          </div>
          <StatusBadge status={contract.status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {contract.status === "processing" && contract.processingProgress !== undefined && (
          <ProgressBar progress={contract.processingProgress} showPercentage />
        )}
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{contract.parties.join(", ")}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(contract.uploadDate).toLocaleDateString()}</span>
          </div>
          
          {contract.financialValue && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{contract.financialValue}</span>
            </div>
          )}
        </div>
        
        {contract.confidenceScore !== undefined && (
          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <span className="text-sm text-muted-foreground">Confidence</span>
            <span className={cn(
              "text-sm font-medium",
              contract.confidenceScore >= 90 ? "text-success" :
              contract.confidenceScore >= 70 ? "text-warning" : "text-destructive"
            )}>
              {contract.confidenceScore}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};