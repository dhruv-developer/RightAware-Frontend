
import { MessageSquareText, AlertTriangle, FileText, Map, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <MessageSquareText className="h-10 w-10 text-legal-blue" />,
    title: 'AI Rights Navigator',
    description: 'Ask any legal question and get instant, accurate guidance based on Indian laws.',
    buttonText: 'Ask a Question',
    id: 'rights-navigator'
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-emergency-red" />,
    title: 'Right Now Emergency Mode',
    description: 'Immediate guidance for urgent situations with location sharing and authorities contact.',
    buttonText: 'Emergency Help',
    id: 'emergency-mode',
    highlight: true
  },
  {
    icon: <FileText className="h-10 w-10 text-trust-purple" />,
    title: 'Legal Document Generator',
    description: 'Create FIRs, complaints, and legal notices in multiple languages with simple forms.',
    buttonText: 'Generate Document',
    id: 'document-generator'
  },
  {
    icon: <Map className="h-10 w-10 text-confidence-green-dark" />,
    title: 'Local Law Explorer',
    description: 'Interactive map to explore state-specific laws and regulations across India.',
    buttonText: 'Explore Laws',
    id: 'law-explorer'
  },
  {
    icon: <Users className="h-10 w-10 text-legal-blue-dark" />,
    title: 'Connect with Legal Aid',
    description: 'Find verified NGOs, legal aid centers, and pro bono lawyers in your area.',
    buttonText: 'Find Help',
    id: 'legal-aid'
  }
];

const FeatureHighlights = () => {
  return (
    <section id="features" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How RightAware Helps You</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Comprehensive tools to help you navigate the legal system with confidence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className={`card-hover-effect overflow-hidden ${feature.highlight ? 'border-emergency-red border-2' : ''}`}>
              <CardHeader className="pb-2">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant={feature.highlight ? "destructive" : "secondary"} 
                  className={`w-full ${feature.highlight ? '' : 'bg-legal-blue/10 hover:bg-legal-blue/20 text-legal-blue-dark'}`}
                >
                  {feature.buttonText}
                </Button>
              </CardContent>
              
              {feature.highlight && (
                <div className="absolute top-2 right-2 bg-emergency-red text-white text-xs px-2 py-1 rounded-full">
                  Urgent
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
