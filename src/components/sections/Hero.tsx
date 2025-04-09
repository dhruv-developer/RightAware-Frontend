
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeroProps = {
  className?: string;
};

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn("py-12 md:py-20 px-4", className)}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-legal-blue/10 text-legal-blue-dark">
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>Empowering citizens with legal knowledge</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Know Your Rights, <span className="text-legal-blue">Take Action</span>
            </h1>
            
            <p className="text-lg text-foreground/80">
              RightAware helps you instantly understand your legal rights, take emergency action, and connect with legal help across India.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <Button size="lg" className="bg-legal-blue hover:bg-legal-blue-dark">
                Start Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            
            <div className="pt-4 flex items-center space-x-4 text-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-legal-blue-light flex items-center justify-center text-xs">KS</div>
                <div className="w-8 h-8 rounded-full bg-legal-blue flex items-center justify-center text-white text-xs">MP</div>
                <div className="w-8 h-8 rounded-full bg-trust-purple flex items-center justify-center text-white text-xs">AR</div>
              </div>
              <p className="text-foreground/70">Trusted by <span className="font-medium">5,000+</span> citizens</p>
            </div>
          </div>
          
          <div className="relative h-[400px] w-full hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-legal-blue-light/30 to-trust-purple-light/30 rounded-2xl overflow-hidden">
              <div className="absolute top-10 left-10 w-64 h-40 bg-white rounded-lg shadow-card p-4 animate-slide-in">
                <h3 className="text-sm font-medium">Know Your Rights</h3>
                <p className="text-xs text-foreground/70 mt-1">AI-powered legal assistant to answer your questions</p>
                <div className="mt-3 flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-legal-blue/10 flex items-center justify-center">
                    <span className="text-legal-blue text-xs">🤖</span>
                  </div>
                  <div className="flex-1 bg-muted rounded-lg text-xs p-2">
                    How can I file an FIR?
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-20 right-10 w-64 h-40 bg-white rounded-lg shadow-card p-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-sm font-medium">Emergency Response</h3>
                <p className="text-xs text-foreground/70 mt-1">Get immediate guidance in urgent situations</p>
                <Button variant="destructive" size="sm" className="mt-3 w-full">
                  Emergency Mode
                </Button>
              </div>
              
              <div className="absolute bottom-40 left-20 w-60 h-36 bg-white rounded-lg shadow-card p-4 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-sm font-medium">Local Laws</h3>
                <p className="text-xs text-foreground/70 mt-1">Explore state-specific legal information</p>
                <div className="mt-2 w-full h-16 bg-muted rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-contain bg-center bg-no-repeat opacity-30"
                      style={{ backgroundImage: "url('https://img.freepik.com/free-vector/map-india-with-states_23-2147779308.jpg')" }}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
