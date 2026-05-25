"use client"

import React from "react"
import { useRouter } from "next/navigation"
import AddEditBookModal, {
  type AddBookFormValues,
  type AddEditBookInitialValues,
  type BookFormType,
} from "@/components/common/addeditbookmodal/AddEditBookModal"
import FilterSearch from "@/components/common/filter/FIlterSearch"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import Stats from "@/components/common/stats/Stats"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import BookCard from "@/src/author/mybooks/BookCard"
import { BookIcon, BookOpenIcon, EyeIcon, MessageCircleIcon } from "lucide-react"
import BookInfoModal, {
  type BookInfoData,
  buildChapterPreviews,
} from "@/components/common/bookinfomodal/BookInfoModal"
import { createBookAction, updateBookAction, deleteBookAction } from "./actions"

export interface ApiBookItem {
  _id: string;
  userId?: string;
  title?: string;
  coverImage?: string;
  description?: string;
  type?: string;
  genre?: string;
  age?: string;
  status?: string;
  tags?: string[];
  commentCount?: number;
  readCount?: number;
  reviewCount?: number;
  ratingCount?: number;
  chapterCount?: number;
  pageCount?: number;
  voteCount?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  likeCount?: number;
}

export interface MyBooksData {
  totalNovelBooks?: number;
  totalShortStoryBooks?: number;
  totalPendingBooks?: number;
  totalPublishedBooks?: number;
  result?: ApiBookItem[];
}

type BookRow = {
  id: string
  title: string
  coverImage: string
  status: "published" | "pending"
  genres: string[]
  rating: number
  reviews: number
  chapters: number
  likes: number
  views: number
  description: string
  bookType: BookFormType
  primaryGenre: string
  ageDemand: string
  tags: string[]
}

function bookToInitialValues(book: BookRow): AddEditBookInitialValues {
  return {
    title: book.title,
    description: book.description,
    type: book.bookType,
    genre: book.primaryGenre,
    ageDemand: book.ageDemand,
    tags: book.tags,
    coverImageUrl: book.coverImage,
  }
}

function bookInfoFromMyBooksRow(book: BookRow): BookInfoData {
  const moderationStatus: BookInfoData["moderationStatus"] =
    book.status === "published" ? "Published" : "Pending"
  const formatLabel = book.bookType === "novel" ? "Novel" : "Short Stories"

  return {
    id: book.id,
    title: book.title,
    coverSrc: book.coverImage,
    authorName: "You",
    authorRole: "Author",
    authorEmail: "author@example.com",
    authorAvatarSrc: "/author.jpg",
    moderationStatus,
    formatLabel,
    genres: book.genres,
    rating: book.rating,
    reviews: book.reviews,
    chapters: book.chapters,
    likes: book.likes,
    views: book.views,
    description: book.description,
    hashtags: book.tags.join(" "),
    chapterPreviews: buildChapterPreviews(book.chapters),
  }
}

function mapApiBookToRow(apiBook: ApiBookItem): BookRow {
  let imageUrl = apiBook.coverImage || "";
  if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
    imageUrl = imageUrl.replace(/\\/g, "/");
    imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL || "http://10.10.7.65:5006"}/${imageUrl}`;
  } else if (imageUrl.startsWith("/")) {
    imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL || "http://10.10.7.65:5006"}${imageUrl}`;
  }

  let parsedTags: string[] = [];
  if (apiBook.tags && Array.isArray(apiBook.tags)) {
    apiBook.tags.forEach(tagGroup => {
        try {
            const parsed = JSON.parse(tagGroup);
            if (Array.isArray(parsed)) {
                parsedTags.push(...parsed);
            } else {
                parsedTags.push(...tagGroup.split(",").map(s => s.trim()));
            }
        } catch(e) {
            parsedTags.push(...tagGroup.split(",").map(s => s.trim()));
        }
    })
  }

  return {
    id: apiBook._id,
    title: apiBook.title || "Untitled",
    coverImage: imageUrl,
    status: (apiBook.status === "approved" || apiBook.status === "published") ? "published" : "pending",
    genres: [apiBook.genre || ""].filter(Boolean),
    rating: apiBook.ratingCount || 0,
    reviews: apiBook.reviewCount || 0,
    chapters: apiBook.chapterCount || 0,
    likes: apiBook.likeCount || 0,
    views: apiBook.readCount || 0,
    description: apiBook.description || "",
    bookType: (apiBook.type?.toLowerCase() === "novel" ? "novel" : "short_stories") as BookFormType,
    primaryGenre: apiBook.genre || "",
    ageDemand: apiBook.age || "",
    tags: parsedTags,
  };
}

function Mybooks({ initialData }: { initialData?: MyBooksData }) {
  const router = useRouter()
  const [bookModalOpen, setBookModalOpen] = React.useState(false)
  const [editingBook, setEditingBook] = React.useState<BookRow | null>(null)
  const [viewingBook, setViewingBook] = React.useState<BookRow | null>(null)
  const [viewingBookModalOpen, setViewingBookModalOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("All")

  const modalInitialValues = React.useMemo(
    (): AddEditBookInitialValues | undefined =>
      editingBook ? bookToInitialValues(editingBook) : undefined,
    [editingBook]
  )

  const openAddBook = () => {
    setEditingBook(null)
    setBookModalOpen(true)
  }

  const openEditBook = (book: BookRow) => {
    setEditingBook(book)
    setBookModalOpen(true)
  }

  const openViewBook = (book: BookRow) => {
    setViewingBook(book)
    setViewingBookModalOpen(true)
  }

  const goAddChapters = (book: BookRow) => {
    const segment = encodeURIComponent(book.title)
    router.push(`/author/add-chapter/${segment}`)
  }

  const handleSaveBook = async (values: AddBookFormValues) => {
    try {
      const formData = new FormData()
      formData.append("title", values.title)
      formData.append("description", values.description)
      formData.append("type", values.type)
      formData.append("genre", values.genre)
      formData.append("age", values.ageDemand)
      
      values.tags.forEach((tag) => {
        formData.append("tags", tag)
      })

      if (values.coverFile) {
        formData.append("coverImage", values.coverFile)
      }

      let res;
      if (editingBook) {
        res = await updateBookAction(editingBook.id, formData)
      } else {
        res = await createBookAction(formData)
      }
      
      if (res.success) {
        toast.success(`Book ${editingBook ? "updated" : "created"} successfully!`)
        setBookModalOpen(false)
        router.refresh()
      } else {
        console.error(`Failed to ${editingBook ? "update" : "create"} book:`, res.message)
        toast.error(res.message || `Failed to ${editingBook ? "update" : "create"} book`)
      }
    } catch (error) {
      console.error(`Error ${editingBook ? "updating" : "creating"} book:`, error)
      toast.error(`An error occurred while ${editingBook ? "updating" : "creating"} the book.`)
    }
  }

  const handleDeleteBook = async (book: BookRow) => {
    if (!window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
      return
    }

    try {
      const res = await deleteBookAction(book.id)
      if (res.success) {
        toast.success("Book deleted successfully!")
        router.refresh()
      } else {
        toast.error(res.message || "Failed to delete book")
      }
    } catch (error) {
      console.error("Error deleting book:", error)
      toast.error("An error occurred while deleting the book.")
    }
  }

  const search = {
    placeholder: "Search books...",
    value: searchTerm,
    onChange: setSearchTerm,
  }
  const selects = [
    {
      placeholder: "Status",
      options: ["All", "published", "pending"],
      value: statusFilter,
      onValueChange: setStatusFilter,
    },
  ]
  const stats = [
    {
      title: "Total Novels",
      value: initialData?.totalNovelBooks || 0,
      icon: <BookIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-purple-500! ",
    },
    {
      title: "Short Stories",
      value: initialData?.totalShortStoryBooks || 0,
      icon: <BookOpenIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-violet-500 to-pink-500! ",
    },
    {
      title: "Pending",
      value: initialData?.totalPendingBooks || 0,
      icon: <EyeIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-blue-500 to-violet-500! ",
    },
    {
      title: "Published",
      value: initialData?.totalPublishedBooks || 0,
      icon: <MessageCircleIcon />,
      iconColor: "text-white ",
      iconBackgroundColor: "bg-linear-to-r from-green-500 to-lime-500! ",
    },
  ]
  const books: BookRow[] = (initialData?.result || [])
    .map(mapApiBookToRow)
    .filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || book.status === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SmallPageInfo
          title="My Books"
          description="Manage your novel collection"
        />
        <Button
          type="button"
          variant="outline"
          className="hover:bg-black hover:text-white"
          onClick={openAddBook}
        >
          Add New Book
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Stats
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            iconBackgroundColor={stat.iconBackgroundColor}
          />
        ))}
      </div>

      <FilterSearch search={search} selects={selects} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            coverImage={book.coverImage}
            status={book.status}
            genres={book.genres}
            rating={book.rating}
            reviews={book.reviews}
            chapters={book.chapters}
            likes={book.likes}
            views={book.views}
            onEdit={() => openEditBook(book)}
            onView={() => openViewBook(book)}
            onAddChapters={() => goAddChapters(book)}
            onDelete={() => handleDeleteBook(book)}
          />
        ))}
      </div>

      <AddEditBookModal
        open={bookModalOpen}
        onOpenChange={(open) => {
          setBookModalOpen(open)
          if (!open) setEditingBook(null)
        }}
        initialValues={modalInitialValues}
        onSave={handleSaveBook}
      />
      <BookInfoModal
        open={viewingBookModalOpen}
        onOpenChange={(open) => {
          setViewingBookModalOpen(open)
          if (!open) {
            setViewingBook(null)
          }
        }}
        book={viewingBook ? bookInfoFromMyBooksRow(viewingBook) : null}
        showModerationActions={false}
      />
    </div>
  )
}

export default Mybooks