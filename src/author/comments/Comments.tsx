"use client"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Heart, Reply, ListFilter, SendHorizontal, MoreVertical } from "lucide-react"
import { fetchCommentsAction, replyToCommentAction } from "./actions"
import { toast } from "sonner"

export interface ApiCommentUser {
    _id: string
    profile: string
    fullName: string
}

export interface ApiComment {
    _id: string
    bookId: string
    userId: ApiCommentUser
    message: string
    likes: string[]
    parentId: string | null
    createdAt: string
    updatedAt: string
    isDeleted?: boolean
    replies?: ApiComment[]
}

export interface CommentsApiData {
    meta: {
        page: number
        limit: number
        total: number
        totalPage: number
    }
    result: ApiComment[]
}

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) return `${diffInDays} days ago`
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} months ago`
}

function getInitials(name: string) {
    if (!name) return "U"
    const parts = name.split(" ")
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
}

function CommentItem({ 
    comment, 
    activeTab, 
    replyingTo, 
    setReplyingTo, 
    replyText, 
    setReplyText, 
    handleSendReply, 
    isSubmittingReply,
    isReply = false,
    rootContextId
}: { 
    comment: ApiComment, 
    activeTab: "book" | "chapter", 
    replyingTo: string | null, 
    setReplyingTo: (id: string | null) => void, 
    replyText: string, 
    setReplyText: (text: string) => void, 
    handleSendReply: (comment: ApiComment, rootContextId: string) => void,
    isSubmittingReply: boolean,
    isReply?: boolean,
    rootContextId: string
}) {
    const [showReplies, setShowReplies] = React.useState(false)
    const hasReplies = comment.replies && comment.replies.length > 0

    return (
        <div className={`flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${isReply ? "ml-12 mt-4" : ""}`}>
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                    {getInitials(comment.userId?.fullName)}
                </div>
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h5 className="font-bold text-gray-900 text-sm">
                            {comment.userId?.fullName || "Unknown User"}
                        </h5>
                        {/* Optional chapter name placeholer based on design */}
                        {activeTab === "chapter" && !isReply && <p className="text-xs text-gray-500 mt-0.5">Chapter Name</p>}
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {comment.message}
                        </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full border">
                            <Heart size={14} className="text-gray-400" />
                            <span>{comment.likes?.length || 0}</span>
                        </div>
                        <span>{comment.createdAt ? formatTimeAgo(comment.createdAt) : "Just now"}</span>
                    </div>
                    
                    <button 
                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                            replyingTo === comment._id ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                        }`}
                    >
                        <Reply size={16} />
                        <span>Reply</span>
                    </button>
                </div>

                {replyingTo === comment._id && (
                    <div className="mt-4 flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100">
                        <input 
                            type="text"
                            placeholder="Write your reply.."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !isSubmittingReply) {
                                    handleSendReply(comment, rootContextId)
                                }
                            }}
                        />
                        <button 
                            disabled={isSubmittingReply || !replyText.trim()}
                            onClick={() => handleSendReply(comment, rootContextId)}
                            className="text-indigo-600 hover:text-indigo-800 disabled:opacity-50 transition-colors p-1"
                        >
                            <SendHorizontal size={20} />
                        </button>
                    </div>
                )}

                {/* Toggle Replies Button */}
                {hasReplies && (
                    <button 
                        onClick={() => setShowReplies(!showReplies)}
                        className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        {showReplies ? "Hide replies" : `View ${comment.replies!.length} replies`}
                    </button>
                )}

                {/* Render nested replies recursively */}
                {hasReplies && showReplies && (
                    <div className="mt-2 border-l-2 border-gray-100 pl-4">
                        {comment.replies!.map(reply => (
                            <CommentItem 
                                key={reply._id} 
                                comment={reply} 
                                activeTab={activeTab} 
                                replyingTo={replyingTo} 
                                setReplyingTo={setReplyingTo} 
                                replyText={replyText} 
                                setReplyText={setReplyText} 
                                handleSendReply={handleSendReply} 
                                isSubmittingReply={isSubmittingReply}
                                isReply={true}
                                rootContextId={rootContextId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Comments({ initialData }: { initialData?: CommentsApiData }) {
    const [activeTab, setActiveTab] = React.useState<"book" | "chapter">("book")
    const [data, setData] = React.useState<CommentsApiData | undefined>(initialData)
    const [isLoading, setIsLoading] = React.useState(false)
    const [replyingTo, setReplyingTo] = React.useState<string | null>(null)
    const [replyText, setReplyText] = React.useState("")
    const [isSubmittingReply, setIsSubmittingReply] = React.useState(false)

    const handleSendReply = async (comment: ApiComment, rootContextId: string) => {
        if (!replyText.trim()) return

        setIsSubmittingReply(true)
        try {
            const res = await replyToCommentAction({
                bookId: activeTab === "book" ? rootContextId : undefined,
                chapterId: activeTab === "chapter" ? rootContextId : undefined, // Assumes bookId holds chapterId if type=chapter based on screenshot comment
                message: replyText,
                parentId: comment._id
            })

            if (res.success) {
                toast.success("Reply posted successfully!")
                setReplyText("")
                setReplyingTo(null)
                
                // Refresh comments to update the UI instantly
                const refreshRes = await fetchCommentsAction(activeTab)
                if (refreshRes.success && refreshRes.data) {
                    setData(refreshRes.data)
                }
            } else {
                toast.error(res.message || "Failed to post reply")
            }
        } catch (error) {
            toast.error("Network error while posting reply")
        } finally {
            setIsSubmittingReply(false)
        }
    }

    React.useEffect(() => {
        // Skip fetch on mount if initialData handles "book" tab
        if (activeTab === "book" && initialData) {
            setData(initialData)
            return
        }
        
        setIsLoading(true)
        fetchCommentsAction(activeTab).then(res => {
            if (res.success && res.data) {
                setData(res.data)
            } else {
                toast.error(res.message || "Failed to fetch comments")
                setData(undefined)
            }
        }).catch(() => {
            toast.error("Network error fetching comments")
        }).finally(() => {
            setIsLoading(false)
        })
    }, [activeTab, initialData])

    const comments = data?.result || []
    const totalComments = data?.meta?.total || 0
    
    // Calculate total love based on likes array across all comments
    const totalLove = comments.reduce((sum, comment) => sum + (comment.likes?.length || 0), 0)

    return (
        <div className="space-y-6">
            <SmallPageInfo
                title="Comments"
                description="Read and respond to reader feedback"
            />

            {/* Stats Cards */}
            <div className="flex gap-6 max-w-2xl">
                <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Comments</p>
                        <h3 className="text-3xl font-bold">{totalComments}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                        <ListFilter size={24} />
                    </div>
                </div>
                
                <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-6 shadow-sm w-full">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Love</p>
                        <h3 className="text-3xl font-bold">{totalLove}</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                        <ListFilter size={24} />
                    </div>
                </div>
            </div>

            {/* Segmented Toggle */}
            <div className="inline-flex bg-white rounded-full p-1 border shadow-sm">
                <button
                    onClick={() => setActiveTab("book")}
                    className={`px-8 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "book" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                    Books
                </button>
                <button
                    onClick={() => setActiveTab("chapter")}
                    className={`px-8 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "chapter" 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                    Chapters
                </button>
            </div>

            {/* All Comments Header */}
            <div className="border-b">
                <div className="inline-block border-b-2 border-blue-600 pb-2 px-1">
                    <h4 className="text-sm font-medium text-blue-600">All Comments ({totalComments})</h4>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="py-8 text-center text-gray-500">Loading comments...</div>
                ) : comments.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">No comments found.</div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem 
                            key={comment._id}
                            comment={comment}
                            activeTab={activeTab}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            replyText={replyText}
                            setReplyText={setReplyText}
                            handleSendReply={handleSendReply}
                            isSubmittingReply={isSubmittingReply}
                            rootContextId={comment.bookId!}
                        />
                    ))
                )}
            </div>
        </div>
    )
}