import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Book } from "@/lib/types"
import { MapPin } from "lucide-react"

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/books/${book.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={book.coverImage || "/placeholder.svg?height=300&width=200"}
            alt={book.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {book.rentalPrice && (
            <div className="absolute bottom-2 right-2 bg-background/90 px-2 py-1 rounded text-sm font-medium">
              ${book.rentalPrice}/week
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">by {book.author}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            {book.location}
          </div>
          <Badge variant={book.available ? "secondary" : "outline"}>
            {book.available ? (book.forRent ? "For Rent" : "For Trade") : "Unavailable"}
          </Badge>
        </CardFooter>
      </Link>
    </Card>
  )
}

