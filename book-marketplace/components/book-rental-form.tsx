"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { rentBook } from "@/lib/actions"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface BookRentalFormProps {
  bookId: string
  rentalPrice: number
}

export function BookRentalForm({ bookId, rentalPrice }: BookRentalFormProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalDays =
    startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0

  const totalPrice = (totalDays / 7) * rentalPrice

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate) return

    setIsSubmitting(true)

    try {
      await rentBook({
        bookId,
        startDate,
        endDate,
        totalPrice,
      })

      // In a real app, this would navigate to a confirmation page
      alert("Rental request submitted successfully!")
    } catch (error) {
      console.error("Error submitting rental request:", error)
      alert("Failed to submit rental request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="rental-dates" className="text-sm font-medium">
              Rental Period
            </label>
            <span className="text-sm text-muted-foreground">${rentalPrice.toFixed(2)}/week</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal" id="rental-dates">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => (startDate ? date <= startDate : date <= new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Card className="p-4 bg-muted/50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Rental period:</span>
              <span>{totalDays} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price per week:</span>
              <span>${rentalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        <Button type="submit" disabled={isSubmitting || !startDate || !endDate}>
          {isSubmitting ? "Processing..." : "Request to Rent"}
        </Button>
      </div>
    </form>
  )
}

