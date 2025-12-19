import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentSuccess() {
  const [location] = useLocation();
  const [courseId, setCourseId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCourseId(params.get('courseId'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-16">
      <Card className="max-w-lg w-full shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-700">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-gray-600 text-lg">
            Thank you for enrolling in our AI coaching program! Your payment has been processed successfully.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-left text-blue-800 space-y-2 text-sm">
              <li className="flex items-start">
                <Mail className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                You'll receive a confirmation email with your enrollment details
              </li>
              <li className="flex items-start">
                <Download className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Course materials will be shared within 24 hours
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                Our team will contact you to schedule your first session
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Questions? Contact us on WhatsApp
            </p>
            <a 
              href="https://wa.me/918839519103"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-semibold hover:underline"
              data-testid="link-whatsapp-support"
            >
              +91 883 951 9103
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button className="w-full" variant="outline" data-testid="button-back-home">
                Back to Home
              </Button>
            </Link>
            {courseId && (
              <Link href={`/course/${courseId}`} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" data-testid="button-view-course">
                  View Course
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
