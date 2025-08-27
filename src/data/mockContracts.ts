export interface Contract {
  id: string;
  title: string;
  parties: string[];
  status: "pending" | "processing" | "completed" | "error";
  confidenceScore?: number;
  uploadDate: string;
  financialValue?: string;
  processingProgress?: number;
  extractedData?: {
    contractType: string;
    startDate: string;
    endDate: string;
    paymentTerms: string;
    slaDetails: string;
    keyObligations: string[];
    riskFactors: string[];
  };
}

export const mockContracts: Contract[] = [
  {
    id: "1",
    title: "Software License Agreement - TechCorp",
    parties: ["TechCorp Inc.", "Digital Solutions LLC"],
    status: "completed",
    confidenceScore: 95,
    uploadDate: "2024-01-15",
    financialValue: "$250,000",
    extractedData: {
      contractType: "Software License Agreement",
      startDate: "2024-02-01",
      endDate: "2025-01-31",
      paymentTerms: "Net 30 days, quarterly payments",
      slaDetails: "99.9% uptime guarantee, 4-hour response time",
      keyObligations: [
        "Provide software maintenance and support",
        "Deliver quarterly updates",
        "Maintain data security standards"
      ],
      riskFactors: [
        "Auto-renewal clause",
        "Limited liability cap at $100,000"
      ]
    }
  },
  {
    id: "2",
    title: "Service Agreement - CloudServices",
    parties: ["CloudServices Corp", "Enterprise Solutions Inc"],
    status: "processing",
    confidenceScore: 78,
    uploadDate: "2024-01-20",
    financialValue: "$500,000",
    processingProgress: 65
  },
  {
    id: "3",
    title: "Partnership Agreement - StartupXYZ",
    parties: ["StartupXYZ", "Innovation Partners"],
    status: "completed",
    confidenceScore: 88,
    uploadDate: "2024-01-18",
    financialValue: "$1,200,000",
    extractedData: {
      contractType: "Strategic Partnership Agreement",
      startDate: "2024-03-01",
      endDate: "2027-02-28",
      paymentTerms: "Milestone-based payments, 15% upon signature",
      slaDetails: "Monthly reporting, quarterly business reviews",
      keyObligations: [
        "Joint product development",
        "Shared marketing efforts",
        "Technology integration"
      ],
      riskFactors: [
        "Exclusivity requirements",
        "IP ownership disputes possible"
      ]
    }
  },
  {
    id: "4",
    title: "Consulting Agreement - FinanceFirm",
    parties: ["FinanceFirm LLC", "Advisory Group"],
    status: "error",
    uploadDate: "2024-01-22",
    financialValue: "$75,000"
  },
  {
    id: "5",
    title: "Supply Chain Contract - ManufacturingCo",
    parties: ["ManufacturingCo", "Supplier Network Ltd"],
    status: "pending",
    uploadDate: "2024-01-25",
    financialValue: "$2,500,000"
  }
];