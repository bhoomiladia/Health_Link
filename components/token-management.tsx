import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, MessageSquare, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function TokenManagement() {
  return (
    <section id="token-system" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-4">Smart Queue Management</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skip the waiting room with our intelligent token system. Get real-time updates via SMS and web
            notifications.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-100">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">SMS Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Receive instant SMS notifications about your queue position and estimated wait time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-100">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">Web Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Track your appointment status in real-time through our web portal.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <p className="text-gray-700">Book your token online or at the clinic</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <p className="text-gray-700">Receive SMS with your token number and estimated time</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <p className="text-gray-700">Get notified when it's your turn to visit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Token Status Demo */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Your Current Token</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">A-47</div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Clinic:</span>
                    <span className="font-medium text-blue-900">City General Hospital</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Token:</span>
                    <span className="font-medium text-blue-900">A-43</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Wait:</span>
                    <span className="font-medium text-orange-600">12 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Queue Position:</span>
                    <span className="font-medium text-blue-900">4th in line</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-green-600 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>SMS notifications enabled</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>We'll notify you 5 minutes before your turn</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Reschedule</Button>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                Cancel Token
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
