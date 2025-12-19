import { useEffect, useState } from "react";
import { Link } from "wouter";
import { XCircle, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCancel() {
  const [courseId, setCourseId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCourseId(params.get('courseId'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4 py-16">
      <Card className="max-w-lg w-full shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-12 h-12 text-orange-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-orange-700">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-600 text-lg">
            Your payment was cancelled. Don't worry - no charges were made to your account.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Need help with payment?</h3>
            <p className="text-blue-800 text-sm mb-3">
              If you encountered any issues or have questions about our courses, our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a 
                href="https://wa.me/918839519103"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                data-testid="button-whatsapp-support"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </a>
              <a 
                href="tel:+918839519103"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                data-testid="button-call-support"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full" variant="outline" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            {courseId && (
              <Link href={`/course/${courseId}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" data-testid="button-try-again">
                  Try Again
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
