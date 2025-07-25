import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Hotel } from "../models/hotel.model.js";
import { Comment } from "../models/comment.models.js";

const getHotelReviewComments = asyncHandler(async (req, res) => {

    const {hotelId} = req.params;

    const comments = await Comment.find({ hotel: hotelId }).populate("postedBy", "fullname"); 
    
    res.status(200)
        .json(
            new ApiResponse(
                200,
                comments,
                "Hotel review comments fetched successfully"
            )
        )
})

const addComment = asyncHandler(async (req, res) => {
    const {hotelId} = req.params;

    const comment = await Comment.create({
        comment: req.body.comment,
        postedBy: req.user._id, 
        hotel: hotelId,
    });

    res.status(200).json(
        new ApiResponse(200, comment, "Comment added successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const commmentId = req.params.commentId;

    const comment = await Comment.findByIdAndDelete(
        commmentId
    )

    res.status(200)
        .json(
            new ApiResponse(
                200,
                comment,
                "Comment deleted successfully"
            )
        )
})

export {
    getHotelReviewComments,
    addComment,
    deleteComment,
}




