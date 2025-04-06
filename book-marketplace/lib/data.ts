import type { Book, Rental, Trade, User } from "./types"

// Mock data for demonstration purposes
// In a real app, this would be fetched from a database

const currentUser: User = {
  id: "user1",
  name: "John Smith",
  email: "john@example.com",
}

const mockBooks: Book[] = [
  {
    id: "book1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A novel about the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    category: "fiction",
    condition: "good",
    pageCount: 180,
    publishedYear: 1925,
    owner: {
      id: "user2",
      name: "Jane Doe",
      email: "jane@example.com",
    },
    location: "New York, NY",
    available: true,
    forRent: true,
    forTrade: true,
    rentalPrice: 5.99,
  },
  {
    id: "book2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "The story of racial injustice and the loss of innocence in the American South during the Great Depression.",
    category: "fiction",
    condition: "like-new",
    pageCount: 281,
    publishedYear: 1960,
    owner: {
      id: "user3",
      name: "Robert Johnson",
      email: "robert@example.com",
    },
    location: "Atlanta, GA",
    available: true,
    forRent: false,
    forTrade: true,
    rentalPrice: undefined,
  },
  {
    id: "book3",
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel set in a totalitarian society where critical thought is suppressed.",
    category: "fiction",
    condition: "good",
    pageCount: 328,
    publishedYear: 1949,
    owner: {
      id: "user4",
      name: "Sarah Williams",
      email: "sarah@example.com",
    },
    location: "Chicago, IL",
    available: true,
    forRent: true,
    forTrade: false,
    rentalPrice: 4.99,
  },
  {
    id: "book4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    category: "fiction",
    condition: "fair",
    pageCount: 310,
    publishedYear: 1937,
    owner: {
      id: "user5",
      name: "Michael Brown",
      email: "michael@example.com",
    },
    location: "Denver, CO",
    available: true,
    forRent: true,
    forTrade: true,
    rentalPrice: 6.99,
  },
  {
    id: "book5",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description: "A romantic novel of manners that follows the character development of Elizabeth Bennet.",
    category: "fiction",
    condition: "good",
    pageCount: 279,
    publishedYear: 1813,
    owner: {
      id: "user2",
      name: "Jane Doe",
      email: "jane@example.com",
    },
    location: "Boston, MA",
    available: true,
    forRent: false,
    forTrade: true,
    rentalPrice: undefined,
  },
  {
    id: "book6",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description: "A novel about teenage alienation and loss of innocence.",
    category: "fiction",
    condition: "good",
    pageCount: 234,
    publishedYear: 1951,
    owner: currentUser,
    location: "San Francisco, CA",
    available: true,
    forRent: true,
    forTrade: true,
    rentalPrice: 4.5,
  },
  {
    id: "book7",
    title: "Brave New World",
    author: "Aldous Huxley",
    description: "A dystopian novel set in a futuristic World State of genetically modified citizens.",
    category: "fiction",
    condition: "like-new",
    pageCount: 311,
    publishedYear: 1932,
    owner: currentUser,
    location: "San Francisco, CA",
    available: true,
    forRent: true,
    forTrade: true,
    rentalPrice: 5.5,
  },
]

const mockRentals: Rental[] = [
  {
    id: "rental1",
    book: mockBooks[0],
    renter: currentUser,
    startDate: "2023-04-15",
    endDate: "2023-04-22",
    totalPrice: 5.99,
    status: "completed",
    createdAt: "2023-04-14",
  },
  {
    id: "rental2",
    book: mockBooks[2],
    renter: currentUser,
    startDate: "2023-05-01",
    endDate: "2023-05-15",
    totalPrice: 9.98,
    status: "active",
    createdAt: "2023-04-28",
  },
]

const mockTrades: Trade[] = [
  {
    id: "trade1",
    book: mockBooks[1],
    withUser: {
      id: "user3",
      name: "Robert Johnson",
      email: "robert@example.com",
    },
    type: "incoming",
    status: "pending",
    createdAt: "2023-04-20",
  },
  {
    id: "trade2",
    book: mockBooks[6],
    withUser: {
      id: "user2",
      name: "Jane Doe",
      email: "jane@example.com",
    },
    type: "outgoing",
    status: "completed",
    createdAt: "2023-03-15",
  },
]

// Simulated data fetching functions
export async function getBooks(): Promise<Book[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockBooks.filter((book) => book.owner.id !== currentUser.id)
}

export async function getBookById(id: string): Promise<Book | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return mockBooks.find((book) => book.id === id)
}

export async function getUserBooks(): Promise<Book[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockBooks.filter((book) => book.owner.id === currentUser.id)
}

export async function getUserRentals(): Promise<Rental[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockRentals
}

export async function getUserTrades(): Promise<Trade[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockTrades
}

