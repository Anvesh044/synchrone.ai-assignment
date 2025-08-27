import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { Upload, FileText, BarChart3, Shield, Zap, Users } from "lucide-react";

export const Homepage = () => {
  const features = [
    {
      icon: Upload,
      title: "Smart Upload",
      description: "Drag and drop PDF contracts for instant processing"
    },
    {
      icon: BarChart3,
      title: "AI Analysis",
      description: "Extract key terms, parties, and financial details automatically"
    },
    {
      icon: Shield,
      title: "Risk Assessment", 
      description: "Identify potential risks and compliance issues"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Get results in seconds with high confidence scores"
    }
  ];

  const stats = [
    { value: "10K+", label: "Contracts Processed" },
    { value: "95%", label: "Accuracy Rate" },
    { value: "3s", label: "Average Processing Time" },
    { value: "24/7", label: "Uptime" }
  ];

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-16">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              Contract Intelligence
            </h1>
            <h2 className="text-3xl font-semibold text-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Powered by Synchrone AI
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Transform your contract analysis with AI-powered intelligence. Upload, analyze, and extract critical information from contracts in seconds.
            </p>
          </div>
          
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="glow-primary">
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Upload Contract
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contracts">
                <FileText className="mr-2 h-5 w-5" />
                View Contracts
              </Link>
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="text-center gradient-card animate-scale-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Powerful Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced AI capabilities designed to streamline your contract management workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="card-hover gradient-card animate-slide-up" style={{ animationDelay: `${0.1 * index}s` }}>
                  <CardContent className="pt-6 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-hero rounded-2xl">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Ready to get started?</span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Upload your first contract and experience the power of AI-driven contract analysis
            </p>
            <Button asChild size="lg" className="glow-primary animate-pulse-glow">
              <Link to="/upload">
                Start Analyzing Contracts
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};