import Image from "next/image"
import { notFound } from "next/navigation"
import { BookRentalForm } from "@/components/book-rental-form"
import { BookTradeForm } from "@/components/book-trade-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getBookById } from "@/lib/data"
import { ArrowLeft, BookOpen, Calendar, MapPin, User } from "lucide-react"

export default async function BookPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id)

  if (!book) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to listings
        </a>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
            <Image
              src={book.coverImage || "/placeholder.svg?height=600&width=400"}
              alt={book.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">{book.category}</Badge>
            <Badge variant="outline">{book.condition}</Badge>
            {book.available ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available</Badge>
            ) : (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">{book.title}</h1>
          <p className="text-xl text-muted-foreground mt-1">by {book.author}</p>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {book.owner.name}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {book.location}
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4" />
              {book.pageCount} pages
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {book.publishedYear}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{book.description}</p>
          </div>

          <Card className="mt-8">
            <CardContent className="pt-6">
              <Tabs defaultValue="rent">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="rent">Rent</TabsTrigger>
                  <TabsTrigger value="trade">Trade</TabsTrigger>
                </TabsList>
                <TabsContent value="rent" className="pt-4">
                  <BookRentalForm bookId={book.id} rentalPrice={book.rentalPrice} />
                </TabsContent>
                <TabsContent value="trade" className="pt-4">
                  <BookTradeForm bookId={book.id} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

