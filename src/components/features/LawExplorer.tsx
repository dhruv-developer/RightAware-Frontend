
import { useState } from 'react';
import { Map as MapIcon, Info, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Simplified states data
const states = [
  { id: 'delhi', name: 'Delhi', region: 'north' },
  { id: 'maharashtra', name: 'Maharashtra', region: 'west' },
  { id: 'karnataka', name: 'Karnataka', region: 'south' },
  { id: 'westbengal', name: 'West Bengal', region: 'east' },
  { id: 'uttarpradesh', name: 'Uttar Pradesh', region: 'north' },
  { id: 'tamilnadu', name: 'Tamil Nadu', region: 'south' },
  { id: 'gujarat', name: 'Gujarat', region: 'west' },
  { id: 'punjab', name: 'Punjab', region: 'north' },
];

// Sample laws
const sampleLaws = {
  'delhi': [
    { title: 'Delhi Rent Control Act', desc: 'Regulates tenancy and eviction procedures in Delhi' },
    { title: 'Delhi Police Act', desc: 'Powers and functions of Delhi Police' }
  ],
  'maharashtra': [
    { title: 'Maharashtra Rent Control Act', desc: 'Protects tenants from eviction and rent increases' },
    { title: 'Maharashtra Protection of Trees Act', desc: 'Conservation of trees in urban areas' }
  ],
  'karnataka': [
    { title: 'Karnataka Shops & Commercial Establishments Act', desc: 'Regulates working conditions in shops' },
    { title: 'Karnataka Land Reforms Act', desc: 'Redistribution of agricultural land' }
  ],
  'default': [
    { title: 'Right to Information Act', desc: 'Access to information from public authorities' },
    { title: 'Consumer Protection Act', desc: 'Protection of consumer rights and interests' }
  ]
};

const LawExplorer = () => {
  const [activeRegion, setActiveRegion] = useState('all');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const { toast } = useToast();

  const handleStateClick = (stateId: string) => {
    setSelectedState(stateId);
    toast({
      title: `${states.find(s => s.id === stateId)?.name || 'State'} Selected`,
      description: "Showing state-specific laws and regulations.",
    });
  };
  
  const filteredStates = activeRegion === 'all' 
    ? states 
    : states.filter(state => state.region === activeRegion);

  const laws = selectedState && sampleLaws[selectedState as keyof typeof sampleLaws] 
    ? sampleLaws[selectedState as keyof typeof sampleLaws] 
    : sampleLaws.default;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapIcon className="h-6 w-6 mr-2 text-confidence-green-dark" />
          Local Law Explorer
        </CardTitle>
        <CardDescription>
          Explore state-specific laws and regulations across India.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" value={activeRegion} onValueChange={setActiveRegion} className="w-full">
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="north">North</TabsTrigger>
                <TabsTrigger value="south">South</TabsTrigger>
                <TabsTrigger value="east">East</TabsTrigger>
                <TabsTrigger value="west">West</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeRegion} className="mt-0">
                <div className="relative bg-muted rounded-lg overflow-hidden p-4">
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    {/* Simplified India map outline as background */}
                    <div className="w-full h-full bg-no-repeat bg-center bg-contain" 
                         style={{ backgroundImage: "url('https://img.freepik.com/free-vector/map-india-with-states_23-2147779308.jpg')" }}>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="font-medium mb-4">
                      {activeRegion === 'all' ? 'All States & UTs' : `${activeRegion.charAt(0).toUpperCase() + activeRegion.slice(1)}ern States & UTs`}
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {filteredStates.map((state) => (
                        <Button
                          key={state.id}
                          variant="outline"
                          className={`justify-between ${selectedState === state.id ? 'bg-confidence-green/30 border-confidence-green-dark' : ''}`}
                          onClick={() => handleStateClick(state.id)}
                        >
                          {state.name}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ))}
                    </div>
                    
                    {filteredStates.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No states found in this region.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">
                {selectedState 
                  ? `Laws in ${states.find(s => s.id === selectedState)?.name}` 
                  : 'National Laws'}
              </h3>
              {selectedState && (
                <Badge variant="outline" className="bg-muted">
                  {states.find(s => s.id === selectedState)?.region.charAt(0).toUpperCase() + 
                   states.find(s => s.id === selectedState)?.region.slice(1)}
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              {laws.map((law, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-3 flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{law.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{law.desc}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-2 mt-1 h-6 w-6">
                      <Info className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full mt-2">View All Laws</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LawExplorer;
