
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import FeatureHighlights from '@/components/sections/FeatureHighlights';
import ChatBot from '@/components/features/ChatBot';
import EmergencyButton from '@/components/features/EmergencyButton';
import DocumentGenerator from '@/components/features/DocumentGenerator';
import LawExplorer from '@/components/features/LawExplorer';
import LegalAid from '@/components/features/LegalAid';
import Footer from '@/components/sections/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <FeatureHighlights />
        
        {/* Detailed Feature Sections */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore Our Features</h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Comprehensive tools to help you understand your rights and take informed legal action
              </p>
            </div>
            
            <Tabs defaultValue="navigator" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="navigator">Rights Navigator</TabsTrigger>
                <TabsTrigger value="document">Document Generator</TabsTrigger>
                <TabsTrigger value="laws">Law Explorer</TabsTrigger>
                <TabsTrigger value="legalaid">Legal Aid</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Mode</TabsTrigger>
              </TabsList>
              
              <TabsContent value="navigator" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-legal-blue">AI-Powered Rights Navigator</h3>
                    <p className="text-lg">
                      Get instant answers to your legal questions from our AI assistant that understands Indian laws and regulations.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-legal-blue/10 flex items-center justify-center mr-2">
                          <span className="text-legal-blue font-medium">✓</span>
                        </div>
                        <span>24/7 access to legal information</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-legal-blue/10 flex items-center justify-center mr-2">
                          <span className="text-legal-blue font-medium">✓</span>
                        </div>
                        <span>Simple explanations of complex laws</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-legal-blue/10 flex items-center justify-center mr-2">
                          <span className="text-legal-blue font-medium">✓</span>
                        </div>
                        <span>Step-by-step guidance for legal processes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-lg flex items-center justify-center" style={{ height: '400px' }}>
                    <p className="text-muted-foreground">Chat interface preview appears here</p>
                    {/* ChatBot interface would be visible here in production */}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="document">
                <DocumentGenerator />
              </TabsContent>
              
              <TabsContent value="laws">
                <LawExplorer />
              </TabsContent>
              
              <TabsContent value="legalaid">
                <LegalAid />
              </TabsContent>
              
              <TabsContent value="emergency" className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold text-emergency-red mb-4">Emergency Mode</h3>
                  <p className="mb-4">
                    When you're in an emergency situation, the Emergency Mode provides immediate guidance,
                    location sharing, and direct contact with authorities.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Key Features:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-emergency-red/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-emergency-red font-medium">1</span>
                          </div>
                          <span>One-tap emergency contacts for police, ambulance, and helplines</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-emergency-red/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-emergency-red font-medium">2</span>
                          </div>
                          <span>Share your exact location with emergency services</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-emergency-red/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-emergency-red font-medium">3</span>
                          </div>
                          <span>Quick guidance for common emergency situations</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">When to Use:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-emergency-red/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-emergency-red font-medium">•</span>
                          </div>
                          <span>When you feel unsafe or threatened</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-emergency-red/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-emergency-red font-medium">•</span>
                          </div>
                          <span>During accidents or medical emergencies</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-emergency-red/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-emergency-red font-medium">•</span>
                          </div>
                          <span>When witnessing a crime</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">About RightAware</h2>
                <p className="text-lg">
                  RightAware was built with a mission to democratize legal knowledge in India and empower citizens to understand and assert their rights.
                </p>
                <p>
                  Our platform combines technology and legal expertise to make the legal system more accessible to everyone, regardless of their background or resources.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-lg">Our Vision</h3>
                    <p className="text-sm text-foreground/70 mt-1">
                      A society where every citizen is aware of their legal rights and can confidently navigate the legal system.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-medium text-lg">Our Mission</h3>
                    <p className="text-sm text-foreground/70 mt-1">
                      To provide accessible, accurate legal information and tools that help citizens take informed legal action.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="gradient-border bg-card p-6 rounded-lg">
                  <h3 className="font-medium text-xl mb-4">Why Choose RightAware?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-legal-blue/10 flex items-center justify-center mr-3 mt-1 shrink-0">
                        <span className="text-legal-blue font-medium">01</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Accurate & Up-to-date</h4>
                        <p className="text-sm text-foreground/70">Our legal information is regularly reviewed by legal experts to ensure accuracy.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-trust-purple/10 flex items-center justify-center mr-3 mt-1 shrink-0">
                        <span className="text-trust-purple font-medium">02</span>
                      </div>
                      <div>
                        <h4 className="font-medium">User-Friendly</h4>
                        <p className="text-sm text-foreground/70">Complex legal concepts explained in simple, accessible language.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-confidence-green-dark/10 flex items-center justify-center mr-3 mt-1 shrink-0">
                        <span className="text-confidence-green-dark font-medium">03</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Empowering</h4>
                        <p className="text-sm text-foreground/70">Tools and resources to help you take immediate action when needed.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Floating Elements */}
      <ChatBot />
      <EmergencyButton />
    </div>
  );
};

export default Index;
