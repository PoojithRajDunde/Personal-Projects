import { AddBookForm } from "@/components/add-book-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AddBookPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" className="mb-6" asChild>
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to listings
        </a>
      </Button>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">List a Book</h1>
        <p className="text-muted-foreground">Share your book with the community for trading or renting.</p>
      </div>

      <div className="mt-8">
        <AddBookForm />
      </div>
    </div>
  )
}

