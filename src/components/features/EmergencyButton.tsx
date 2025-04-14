'use client';

import { useState } from 'react';
import { AlertCircle, AlertTriangle, Navigation, Phone, Copy, X, Check, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const emergencyContacts = [
  { name: 'Police', number: '100', description: 'For crime, violence, and threats' },
  { name: 'Ambulance', number: '108', description: 'For medical emergencies' },
  { name: 'Women Helpline', number: '1091', description: 'For women in distress' },
  { name: 'Child Helpline', number: '1098', description: 'For children in need' },
  { name: 'National Emergency', number: '112', description: 'Unified emergency number' },
];

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [copiedNumber, setCopiedNumber] = useState('');
  const [alertSent, setAlertSent] = useState(false);
  const { toast } = useToast();

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          setLocation({ lat, lng });

          try {
            const formData = new FormData();
            formData.append('latitude', lat.toString());
            formData.append('longitude', lng.toString());
            formData.append('emergency_type', 'Emergency from UI');
            formData.append('contact', '+918826417060'); // Optional: replace with user profile or dynamic

            const res = await fetch('http://localhost:8000/api/emergency-alert', {
              method: 'POST',
              body: formData,
            });

            if (res.ok) {
              setAlertSent(true);
              toast({
                title: "📍 Location Shared",
                description: "Emergency alert sent with your location to trusted authorities.",
              });
            } else {
              throw new Error('Failed to send alert');
            }
          } catch (err) {
            console.error(err);
            toast({
              title: "❌ Failed to Send Alert",
              description: "There was an error while sending your emergency alert.",
              variant: "destructive",
            });
          }
        },
        () => {
          toast({
            title: "📍 Location Error",
            description: "Could not access your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "🌐 Geolocation Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedNumber(text);
      setTimeout(() => setCopiedNumber(''), 2000);

      toast({
        title: `${type} Copied`,
        description: `${type === 'Number' ? text : 'Location'} copied to clipboard.`,
      });
    });
  };

  const MobileEmergencyButton = () => (
    <Button
      variant="destructive"
      className="fixed bottom-6 left-6 z-50 rounded-full h-14 w-14 shadow-lg animate-pulse-slow"
      size="icon"
      onClick={() => setIsOpen(true)}
    >
      <AlertCircle className="h-6 w-6" />
    </Button>
  );

  return (
    <>
      <MobileEmergencyButton />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Mode
            </DialogTitle>
            <DialogDescription>
              Get immediate assistance for your urgent situation.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="call" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="call">Emergency Calls</TabsTrigger>
              <TabsTrigger value="location">Share Location</TabsTrigger>
            </TabsList>

            <TabsContent value="call" className="mt-4 space-y-4">
              <div className="grid gap-3">
                {emergencyContacts.map((contact, index) => (
                  <Card key={index} className="bg-background">
                    <CardContent className="p-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{contact.name}: <span className="text-destructive">{contact.number}</span></h4>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(contact.number, 'Number')}
                      >
                        {copiedNumber === contact.number ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-4">
              <Card className="bg-background">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <p className="text-sm">Share your current location with emergency services or trusted contacts.</p>

                    <div className="h-40 bg-muted rounded-md flex items-center justify-center relative">
                      {location ? (
                        <div className="text-center">
                          <div className="font-medium">📍 Location captured</div>
                          <div className="text-sm text-muted-foreground">
                            Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <Navigation className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Tap below to capture and share your location</p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={shareLocation}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        {location ? 'Resend Location' : 'Send Location'}
                      </Button>

                      <Button
                        className="w-full"
                        disabled={!location}
                        onClick={() => location && copyToClipboard(
                          `https://maps.google.com/?q=${location.lat},${location.lng}`,
                          'Location'
                        )}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Location Link
                      </Button>
                    </div>

                    {alertSent && (
                      <p className="text-sm text-green-600 font-medium text-center pt-2">
                        ✅ Emergency alert sent successfully!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <DialogFooter className="sm:justify-center">
            <Button variant="destructive" className="w-full" onClick={() => window.location.href = 'tel:112'}>
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency (112)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
