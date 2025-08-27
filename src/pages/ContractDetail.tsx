import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockContracts } from "@/data/mockContracts";
import { 
  ArrowLeft, 
  FileText, 
  Calendar, 
  Users, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ContractDetail = () => {
  const { id } = useParams();
  const contract = mockContracts.find(c => c.id === id);

  if (!contract) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Contract Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The contract you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/contracts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contracts
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const detailSections = [
    {
      title: "Contract Information",
      icon: FileText,
      items: [
        { label: "Contract Type", value: contract.extractedData?.contractType || "Not extracted" },
        { label: "Start Date", value: contract.extractedData?.startDate || "Not extracted" },
        { label: "End Date", value: contract.extractedData?.endDate || "Not extracted" },
        { label: "Upload Date", value: new Date(contract.uploadDate).toLocaleDateString() }
      ]
    },
    {
      title: "Financial Details",
      icon: DollarSign,
      items: [
        { label: "Total Value", value: contract.financialValue || "Not specified" },
        { label: "Payment Terms", value: contract.extractedData?.paymentTerms || "Not extracted" }
      ]
    },
    {
      title: "Service Level Agreement",
      icon: Shield,
      items: [
        { label: "SLA Details", value: contract.extractedData?.slaDetails || "Not extracted" }
      ]
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/contracts">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Contracts
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contract Header */}
            <Card className="gradient-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{contract.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {contract.parties.join(" • ")}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={contract.status} />
                </div>
              </CardHeader>
            </Card>

            {/* Detailed Information */}
            {detailSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.title} className="gradient-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.items.map((item) => (
                        <div key={item.label} className="space-y-1">
                          <dt className="text-sm font-medium text-muted-foreground">
                            {item.label}
                          </dt>
                          <dd className="text-sm font-medium">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Key Obligations */}
            {contract.extractedData?.keyObligations && (
              <Card className="gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    Key Obligations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {contract.extractedData.keyObligations.map((obligation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{obligation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Risk Factors */}
            {contract.extractedData?.riskFactors && (
              <Card className="gradient-card border-warning/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {contract.extractedData.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Status Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Processing Status</span>
                  <StatusBadge status={contract.status} />
                </div>
                
                {contract.confidenceScore !== undefined && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence Score</span>
                    <Badge variant={
                      contract.confidenceScore >= 90 ? "default" :
                      contract.confidenceScore >= 70 ? "secondary" : "destructive"
                    }>
                      {contract.confidenceScore}%
                    </Badge>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Upload Date</span>
                  <span className="text-sm font-medium">
                    {new Date(contract.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions Card */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button className="w-full" variant="outline">
                  Export Analysis
                </Button>
                <Button className="w-full" variant="outline">
                  Share Contract
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};