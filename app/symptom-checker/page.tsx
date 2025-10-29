"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mic, MicOff, Send, Globe, Lightbulb, ShieldCheck } from 'lucide-react'
import { useState } from "react"
import Link from "next/link"

export default function SymptomCheckerPage() {
const [isListening, setIsListening] = useState(false)
const [symptoms, setSymptoms] = useState("")
const [selectedLanguage, setSelectedLanguage] = useState("English")
const [results, setResults] = useState<any>(null)
const [loading, setLoading] = useState(false)
const languages = ["English", "Hindi", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"]

const handleCheckSymptoms = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  setResults(null)

  const response = await fetch('/api/symptom-checker', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      symptoms,
      language: selectedLanguage
    }),
  })

  const data = await response.json()
  setResults(data)
  setLoading(false)
}

return (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-primary-900 mb-8">AI Symptom Checker</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-primary-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary-900">Describe Your Symptoms</CardTitle>
            <CardDescription className="text-gray-600">
              Our AI will analyze your input to provide preliminary insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckSymptoms} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="symptoms-input" className="text-gray-700">Your Symptoms</Label>
                <Textarea
                  id="symptoms-input"
                  placeholder="e.g., I have a fever, body aches, and a sore throat for two days."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={6}
                  required
                  className="border-primary-200 focus:border-primary-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-primary-600" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm border border-primary-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  onClick={() => setIsListening(!isListening)}
                  type="button"
                  className="border-primary-200 hover:bg-primary-50"
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
              </div>
              {isListening && (
                <div className="flex items-center space-x-2 text-sm text-primary-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>Listening in {selectedLanguage}...</span>
                </div>
              )}
              <Button type="submit" className="w-full bg-accent-600 hover:bg-accent-700 text-white py-2 rounded-lg" disabled={loading}>
                {loading ? "Analyzing..." : "Check Symptoms"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="border-primary-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary-900">Possible Conditions & Advice</CardTitle>
            <CardDescription className="text-gray-600">
              This is not a diagnosis. Consult a medical professional for accurate assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-center py-12 text-primary-600">
                <p>Analyzing your symptoms...</p>
                <div className="mt-4 animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            )}
            {results && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">Possible Condition:</h3>
                  <p className="text-lg text-accent-600">{results.condition}</p>
                  <p className="text-sm text-gray-600">Confidence: {results.confidence}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-emerald-600" /> First-Aid Tips:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {results.firstAid.map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary-600" /> When to See a Doctor:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {results.whenToSeeDoctor.map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                  <p>
                    For a definitive diagnosis and treatment plan, please consult a qualified healthcare professional.
                  </p>
                  <Button asChild variant="outline" className="mt-4 border-primary-200 text-primary-600 hover:bg-primary-50">
                    <Link href="/nearby-hospitals">Find a Doctor Near Me</Link>
                  </Button>
                </div>
              </div>
            )}
            {!loading && !results && (
              <div className="text-center py-12 text-gray-600">
                <p>Enter your symptoms to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
    <Footer />
  </div>
)
}
