"use client"
import FilterSearch from '@/components/common/filter/FIlterSearch'
import BookCard from '@/src/author/mybooks/BookCard'
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import Stats from '@/components/common/stats/Stats'
import { Button } from '@/components/ui/button'
import { BookIcon, BookOpenIcon, EyeIcon, MessageCircleIcon } from 'lucide-react'
import React from 'react'

function Mybooks() {
    const search = {
        placeholder: "Search",
        value: "",
        onChange: (value: string) => {
            console.log(value)
        }
    }
    const selects = [
        {
            placeholder: "Select",
            options: ["Option 1", "Option 2", "Option 3"],
            value: "",
            onValueChange: (value: string) => {
                console.log(value)
            }
        }
    ]
    const stats = [
        {
            title: "Total Novels",
            value: 100,
            icon: <BookIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
        },
        {
            title: "Short Stories",
            value: 100,
            icon: <BookOpenIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
        },
        {
            title: "Pending",
            value: 100,
            icon: <EyeIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
        },
        {
            title: "Published",
            value: 100,
            icon: <MessageCircleIcon />,
            iconColor: "text-white ",
            iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
        },
    ]
    const books = [
        {
            title: "Book 1",
            coverImage: "/bekas.jpg",
            status: "published",
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 4.5,
            reviews: 100,
            chapters: 10,
            likes: 100,
            views: 100,
        },
        {
            title: "Book 2",
            coverImage: "/bekas.jpg",
            status: "published",
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 4.5,
            reviews: 100,
            chapters: 10,
            likes: 100,
            views: 100,
        },
        {
            title: "Book 3",
            coverImage: "/bekas.jpg",
            status: "published",
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 4.5,
            reviews: 100,
            chapters: 10,
            likes: 100,
            views: 100,
        },
        {
            title: "Book 4",
            coverImage: "/bekas.jpg",
            status: "published",
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 4.5,
            reviews: 100,
            chapters: 10,
            likes: 100,
            views: 100,
        },
        {
            title: "Book 5",
            coverImage: "/bekas.jpg",
            status: "published",
            genres: ["Genre 1", "Genre 2", "Genre 3"],
            rating: 4.5,
            reviews: 100,
            chapters: 10,
            likes: 100,
            views: 100,
        },
    ]
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <SmallPageInfo
                    title="My Books"
                    description="Manage your novel collection"
                />
                <Button variant="outline" className="hover:bg-black hover:text-white">Add New Book</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Stats key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        iconColor={stat.iconColor}
                        iconBackgroundColor={stat.iconBackgroundColor}
                    />
                ))}
            </div>

            <FilterSearch
                search={search}
                selects={selects}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {books.map((book) => (
                    <BookCard key={book.title}
                        title={book.title}
                        coverImage={book.coverImage}
                        status={book.status as "published" | "pending"}
                        genres={book.genres as string[]}
                        rating={book.rating as number}
                        reviews={book.reviews as number}
                        chapters={book.chapters as number}
                        likes={book.likes as number}
                        views={book.views as number}
                        onEdit={() => { }}
                        onDelete={() => { }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Mybooks