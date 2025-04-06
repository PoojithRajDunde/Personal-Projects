"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addBook } from "@/lib/actions"
import type { BookCategory, BookCondition } from "@/lib/types"
import { Upload } from "lucide-react"

export function AddBookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<BookCategory | "">("")
  const [condition, setCondition] = useState<BookCondition | "">("")
  const [pageCount, setPageCount] = useState("")
  const [publishedYear, setPublishedYear] = useState("")
  const [location, setLocation] = useState("")
  const [forRent, setForRent] = useState(false)
  const [forTrade, setForTrade] = useState(true)
  const [rentalPrice, setRentalPrice] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !author || !category || !condition) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would upload the image and save the book data
      await addBook({
        title,
        author,
        description,
        category: category as BookCategory,
        condition: condition as BookCondition,
        pageCount: pageCount ? Number.parseInt(pageCount) : undefined,
        publishedYear: publishedYear ? Number.parseInt(publishedYear) : undefined,
        location,
        forRent,
        forTrade,
        rentalPrice: rentalPrice ? Number.parseFloat(rentalPrice) : undefined,
        // image would be handled separately in a real app
      })

      // In a real app, this would navigate to the book page
      alert("Book added successfully!")
    } catch (error) {
      console.error("Error adding book:", error)
      alert("Failed to add book. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6">
        <div className="grid gap-3">
          <h2 className="text-xl font-semibold">Book Details</h2>

          <div className="grid gap-2">
            <Label htmlFor="title" className="required">
              Title
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="author" className="required">
              Author
            </Label>
            <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category" className="required">
                Category
              </Label>
              <Select value={category} onValueChange={(value) => setCategory(value as BookCategory)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiction">Fiction</SelectItem>
                  <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="biography">Biography</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="condition" className="required">
                Condition
              </Label>
              <Select value={condition} onValueChange={(value) => setCondition(value as BookCondition)}>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like-new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="pageCount">Page Count</Label>
              <Input id="pageCount" type="number" value={pageCount} onChange={(e) => setPageCount(e.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="publishedYear">Published Year</Label>
              <Input
                id="publishedYear"
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location" className="required">
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              required
            />
          </div>
        </div>

        <div className="grid gap-3">
          <h2 className="text-xl font-semibold">Availability</h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="forTrade" checked={forTrade} onCheckedChange={(checked) => setForTrade(checked === true)} />
              <Label htmlFor="forTrade">Available for Trade</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="forRent" checked={forRent} onCheckedChange={(checked) => setForRent(checked === true)} />
              <Label htmlFor="forRent">Available for Rent</Label>
            </div>

            {forRent && (
              <div className="grid gap-2 pl-6">
                <Label htmlFor="rentalPrice">Weekly Rental Price ($)</Label>
                <Input
                  id="rentalPrice"
                  type="number"
                  step="0.01"
                  value={rentalPrice}
                  onChange={(e) => setRentalPrice(e.target.value)}
                  required={forRent}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-3">
          <h2 className="text-xl font-semibold">Book Cover</h2>

          <Card className="cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0])
                    }
                  }}
                />
              </div>
              {image && <p className="mt-2 text-sm">Selected: {image.name}</p>}
            </CardContent>
          </Card>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Adding Book..." : "Add Book"}
      </Button>
    </form>
  )
}

