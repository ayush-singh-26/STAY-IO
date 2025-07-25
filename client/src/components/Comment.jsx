import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";

function Comment({ selectedHotel }) {    
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [comments, setComments] = useState([]);
    const user = useSelector((state) => state.auth.userData);
    
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/v1/comments/getHotelReviewComments/${selectedHotel._id}`);
                setComments(response.data.data || []);
            } catch (error) {
                console.error("Error fetching comments:", error.response || error.message);
                setComments([]);
            }
        };
        fetchComments();
    }, [selectedHotel,comments]);

    const addComment = async (data) => {
        try {
            await axios.post(`/api/v1/comments/addComment/${selectedHotel._id}`, {
                comment: data.comment,
            });
            reset()
        } catch (error) {
            console.error("Error adding comment:", error.response || error.message);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/v1/comments/deleteComment/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error.response || error.message);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            <form onSubmit={handleSubmit(addComment)} className="mt-6 flex items-center space-x-2">
                <input
                    {...register("comment", { required: "Comment is required" })}
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Post
                </button>
            </form>

            {errors.comment && (
                <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
            )}

            <div className="space-y-4 mt-6">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="p-4 bg-gray-100 rounded-lg text-gray-700 relative">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{comment.postedBy?.fullname || "Anonymous"}</p>
                                    <p className="mt-1">{comment.comment}</p>
                                </div>
                                {user && user._id === comment.postedBy?._id && (
                                    <button
                                        onClick={() => deleteComment(comment._id)}
                                        className="text-gray-500 hover:text-red-500 transition-colors ml-4"
                                        title="Delete comment"
                                    >
                                        <FiTrash2 className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">
                        {comments.length === 0
                            ? "No comments yet. Be the first to comment!"
                            : "Error fetching comments. Please try again."}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Comment;