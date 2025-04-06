export type BookCategory = "fiction" | "non-fiction" | "science" | "history" | "biography" | "children" | "other"

export type BookCondition = "new" | "like-new" | "good" | "fair" | "poor"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  category: BookCategory
  condition: BookCondition
  pageCount?: number
  publishedYear?: number
  coverImage?: string
  owner: User
  location: string
  available: boolean
  forRent: boolean
  forTrade: boolean
  rentalPrice?: number
}

export interface Rental {
  id: string
  book: Book
  renter: User
  startDate: string
  endDate: string
  totalPrice: number
  status: "pending" | "active" | "completed" | "cancelled"
  createdAt: string
}

export interface Trade {
  id: string
  book: Book
  withUser: User
  type: "incoming" | "outgoing"
  status: "pending" | "accepted" | "rejected" | "completed"
  createdAt: string
}

