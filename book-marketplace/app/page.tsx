import Link from "next/link"
import { BookCard } from "@/components/book-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { getBooks } from "@/lib/data"

export default async function Home() {
  const books = await getBooks()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">BookSwap</h1>
          <p className="text-muted-foreground mt-1">Trade, rent, and discover books in your community</p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <SearchBar />
          <Button asChild>
            <Link href="/books/add">List a Book</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}

