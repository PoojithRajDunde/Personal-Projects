"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { proposeTrade } from "@/lib/actions"
import { getUserBooks } from "@/lib/data"
import type { Book } from "@/lib/types"
import { useEffect } from "react"

interface BookTradeFormProps {
  bookId: string
}

export function BookTradeForm({ bookId }: BookTradeFormProps) {
  const [myBooks, setMyBooks] = useState<Book[]>([])
  const [selectedBookId, setSelectedBookId] = useState<string>("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getUserBooks()
        setMyBooks(books)
      } catch (error) {
        console.error("Error fetching user books:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedBookId) return

    setIsSubmitting(true)

    try {
      await proposeTrade({
        requestedBookId: bookId,
        offeredBookId: selectedBookId,
        message,
      })

      // In a real app, this would navigate to a confirmation page
      alert("Trade proposal submitted successfully!")
    } catch (error) {
      console.error("Error submitting trade proposal:", error)
      alert("Failed to submit trade proposal. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-4">Loading your books...</div>
  }

  if (myBooks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="mb-4">You don't have any books to trade.</p>
          <Button asChild>
            <a href="/books/add">Add a Book First</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="book-to-trade" className="text-sm font-medium">
            Select a book to offer for trade
          </label>

          <Select value={selectedBookId} onValueChange={setSelectedBookId}>
            <SelectTrigger id="book-to-trade">
              <SelectValue placeholder="Select one of your books" />
            </SelectTrigger>
            <SelectContent>
              {myBooks.map((book) => (
                <SelectItem key={book.id} value={book.id}>
                  {book.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <label htmlFor="trade-message" className="text-sm font-medium">
            Message to owner (optional)
          </label>

          <Textarea
            id="trade-message"
            placeholder="Introduce yourself and explain why you're interested in this book..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <Button type="submit" disabled={isSubmitting || !selectedBookId}>
          {isSubmitting ? "Processing..." : "Propose Trade"}
        </Button>
      </div>
    </form>
  )
}

