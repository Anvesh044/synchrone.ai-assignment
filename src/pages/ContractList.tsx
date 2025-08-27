import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ContractCard } from "@/components/ContractCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockContracts } from "@/data/mockContracts";
import { Search, Filter, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const ContractList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filteredContracts = mockContracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || contract.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockContracts.length,
    completed: mockContracts.filter(c => c.status === "completed").length,
    processing: mockContracts.filter(c => c.status === "processing").length,
    pending: mockContracts.filter(c => c.status === "pending").length,
    error: mockContracts.filter(c => c.status === "error").length,
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contract Management</h1>
            <p className="text-muted-foreground mt-2">
              View and manage all your uploaded contracts
            </p>
          </div>
          <Button asChild className="glow-primary">
            <Link to="/upload">
              <Plus className="mr-2 h-4 w-4" />
              Upload Contract
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{statusCounts.all}</div>
            <div className="text-sm text-muted-foreground">Total</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success">{statusCounts.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{statusCounts.processing}</div>
            <div className="text-sm text-muted-foreground">Processing</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning">{statusCounts.pending}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-destructive">{statusCounts.error}</div>
            <div className="text-sm text-muted-foreground">Errors</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contracts by title or parties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses ({statusCounts.all})</SelectItem>
                <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
                <SelectItem value="processing">Processing ({statusCounts.processing})</SelectItem>
                <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
                <SelectItem value="error">Error ({statusCounts.error})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contract Grid */}
        {filteredContracts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract, index) => (
              <ContractCard
                key={contract.id}
                contract={contract}
                onClick={() => navigate(`/contract/${contract.id}`)}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "No contracts match your search criteria" 
                : "No contracts uploaded yet"
              }
            </div>
            <Button asChild>
              <Link to="/upload">Upload Your First Contract</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};