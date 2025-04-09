
import { Users, MapPin, Phone, ExternalLink, Star, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample legal aid providers data
const legalAidProviders = [
  {
    id: 1,
    name: 'Delhi Legal Services Authority',
    type: 'Government',
    location: 'Delhi',
    address: 'Patiala House Courts Complex, New Delhi',
    phone: '011-23384999',
    rating: 4.2,
    specializations: ['Family Law', 'Criminal Law', 'Property Disputes'],
    verified: true,
  },
  {
    id: 2,
    name: 'Pro Bono India',
    type: 'NGO',
    location: 'Mumbai',
    address: 'Andheri East, Mumbai',
    phone: '022-26847888',
    rating: 4.5,
    specializations: ['Women\'s Rights', 'Domestic Violence', 'Child Rights'],
    verified: true,
  },
  {
    id: 3,
    name: 'Legal Aid Society',
    type: 'NGO',
    location: 'Bangalore',
    address: 'Koramangala, Bangalore',
    phone: '080-25487777',
    rating: 4.0,
    specializations: ['Labor Law', 'Consumer Rights', 'RTI'],
    verified: true,
  },
  {
    id: 4,
    name: 'National Legal Services Authority',
    type: 'Government',
    location: 'Pan India',
    address: 'Supreme Court Complex, New Delhi',
    phone: '011-23385321',
    rating: 4.3,
    specializations: ['Constitutional Rights', 'Public Interest Litigation'],
    verified: true,
  },
];

const LegalAid = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-6 w-6 mr-2 text-legal-blue-dark" />
          Connect with Legal Aid
        </CardTitle>
        <CardDescription>
          Find verified legal aid organizations and pro bono lawyers near you.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or location" 
                  className="pl-9"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ngo">NGOs</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="probono">Pro Bono Lawyers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Specialization</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specializations</SelectItem>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="property">Property Disputes</SelectItem>
                    <SelectItem value="womens">Women's Rights</SelectItem>
                    <SelectItem value="labor">Labor Law</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All India</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="kolkata">Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full bg-legal-blue-dark hover:bg-legal-blue-dark/90">
                Apply Filters
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {legalAidProviders.map((provider) => (
                <Card key={provider.id} className="card-hover-effect overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <h3 className="font-semibold text-lg">{provider.name}</h3>
                          {provider.verified && (
                            <Badge className="ml-2 bg-confidence-green text-confidence-green-dark">Verified</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Badge variant="outline" className="mr-2">
                            {provider.type}
                          </Badge>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{provider.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-start mt-3">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2" />
                          <span className="text-sm">{provider.address}</span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">{provider.phone}</span>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap gap-1">
                          {provider.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-row sm:flex-col space-y-0 sm:space-y-2 space-x-2 sm:space-x-0">
                        <Button variant="default" size="sm" className="bg-legal-blue hover:bg-legal-blue-dark">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>Contact</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          <span>Details</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full">
                Load More
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LegalAid;
