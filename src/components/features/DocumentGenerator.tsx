
import { useState } from 'react';
import { FileText, Languages, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const documentTypes = [
  { value: 'fir', label: 'First Information Report (FIR)' },
  { value: 'complaint', label: 'Police Complaint' },
  { value: 'notice', label: 'Legal Notice' },
  { value: 'rtirequest', label: 'RTI Request' },
];

const languages = [
  { value: 'english', label: 'English' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'telugu', label: 'Telugu' },
  { value: 'bengali', label: 'Bengali' },
  { value: 'marathi', label: 'Marathi' },
];

const DocumentGenerator = () => {
  const [docType, setDocType] = useState('');
  const [language, setLanguage] = useState('english');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    incident: '',
    date: '',
    location: '',
  });
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!docType || !formData.name || !formData.incident) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate document preview (simplified for demo)
    const documentText = `
      ${docType === 'fir' ? 'FIRST INFORMATION REPORT' : docType === 'complaint' ? 'POLICE COMPLAINT' : docType === 'notice' ? 'LEGAL NOTICE' : 'RTI REQUEST'}
      
      Date: ${formData.date || new Date().toLocaleDateString()}
      
      To,
      The Officer in Charge,
      Police Station/Authority
      
      Subject: ${docType === 'fir' ? 'Report of' : docType === 'complaint' ? 'Complaint regarding' : docType === 'notice' ? 'Legal Notice for' : 'Request for Information regarding'} ${formData.incident.substring(0, 50)}...
      
      Respected Sir/Madam,
      
      I, ${formData.name}, residing at ${formData.address}, contact number: ${formData.phone}, would like to report/complain about the following incident:
      
      ${formData.incident}
      
      The incident took place on ${formData.date} at ${formData.location}.
      
      I request you to take appropriate action as per the law.
      
      Yours faithfully,
      ${formData.name}
    `;
    
    setPreview(documentText);
    
    toast({
      title: "Document Generated",
      description: "Your document has been successfully generated.",
    });
  };

  const handleDownload = () => {
    if (!preview) return;
    
    const element = document.createElement('a');
    const file = new Blob([preview], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${docType}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Document Downloaded",
      description: "Your document has been downloaded successfully.",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-6 w-6 mr-2 text-trust-purple" />
          Legal Document Generator
        </CardTitle>
        <CardDescription>
          Generate legal documents in multiple languages with this simple tool.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="docType">Document Type</Label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger id="docType">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your full address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date of Incident</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location of Incident</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Where did it happen?"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="incident">Description of Incident</Label>
                <Textarea
                  id="incident"
                  name="incident"
                  placeholder="Describe what happened in detail..."
                  className="min-h-32"
                  value={formData.incident}
                  onChange={handleChange}
                />
              </div>
              
              <Button type="submit" className="w-full bg-trust-purple hover:bg-trust-purple-dark">
                Generate Document
              </Button>
            </form>
          </div>
          
          <div className="border rounded-lg p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Document Preview</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <Languages className="h-4 w-4 mr-1" /> 
                {languages.find(l => l.value === language)?.label || 'English'}
              </div>
            </div>
            
            {preview ? (
              <>
                <div className="whitespace-pre-line text-sm bg-muted p-4 rounded-md h-[400px] overflow-y-auto">
                  {preview}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Document
                </Button>
              </>
            ) : (
              <div className="h-[450px] flex items-center justify-center text-center p-4">
                <div className="text-muted-foreground">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p>Fill out the form and click "Generate Document" to see a preview here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentGenerator;
