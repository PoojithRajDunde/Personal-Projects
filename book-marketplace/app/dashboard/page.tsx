import { TableCell } from "@/components/ui/table"
import { TableBody } from "@/components/ui/table"
import { TableHead } from "@/components/ui/table"
import { TableRow } from "@/components/ui/table"
import { TableHeader } from "@/components/ui/table"
import { Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookCard } from "@/components/book-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserBooks, getUserRentals, getUserTrades } from "@/lib/data"
import { BookOpen, Plus } from "lucide-react"

export default async function DashboardPage() {
  const myBooks = await getUserBooks()
  const myRentals = await getUserRentals()
  const myTrades = await getUserTrades()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your books, rentals, and trades</p>
        </div>
        <Button asChild>
          <Link href="/books/add">
            <Plus className="mr-2 h-4 w-4" />
            List a Book
          </Link>
        </Button>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Activity</CardTitle>
            <CardDescription>Track your current rentals, trades, and listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="books">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="books">My Books</TabsTrigger>
                <TabsTrigger value="rentals">Rentals</TabsTrigger>
                <TabsTrigger value="trades">Trades</TabsTrigger>
              </TabsList>
              <TabsContent value="books" className="pt-6">
                {myBooks.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {myBooks.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No books listed yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Start sharing your books with the community.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/books/add">
                        <Plus className="mr-2 h-4 w-4" />
                        List a Book
                      </Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="rentals" className="pt-6">
                {myRentals.length > 0 ? (
                  <div className="divide-y">
                    {myRentals.map((rental) => (
                      <div key={rental.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="font-medium">{rental.book.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(rental.startDate).toLocaleDateString()} -{" "}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={rental.status === "active" ? "default" : "outline"}>{rental.status}</Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/rentals/${rental.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No rentals yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Browse books to find your next read.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/">Browse Books</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="trades" className="pt-6">
                {myTrades.length > 0 ? (
                  <div className="divide-y">
                    {myTrades.map((trade) => (
                      <div key={trade.id} className="py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="font-medium">
                            {trade.type === "outgoing" ? "Offering: " : "Requesting: "}
                            {trade.book.title}
                          </div>
                          <div className="text-sm text-muted-foreground">with {trade.withUser.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              trade.status === "pending"
                                ? "secondary"
                                : trade.status === "accepted"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {trade.status}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/trades/${trade.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No trades yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Start trading books with other users.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/">Browse Books</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View your past rentals and trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>With</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 23, 2023</TableCell>
                    <TableCell>Rental</TableCell>
                    <TableCell>The Great Gatsby</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell className="text-right">$12.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 15, 2023</TableCell>
                    <TableCell>Trade</TableCell>
                    <TableCell>To Kill a Mockingbird</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell className="text-right">-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feb 28, 2023</TableCell>
                    <TableCell>Rental</TableCell>
                    <TableCell>1984</TableCell>
                    <TableCell>Alex Johnson</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell className="text-right">$8.50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

