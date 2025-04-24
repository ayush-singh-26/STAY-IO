import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { Hotel } from "../models/hotel.model.js";
import { Comment } from "../models/comment.models.js";

const getHotelReviewComments = asyncHandler(async (req, res) => {

    const hotelId = req.params.hotelId;
    console.log(hotelId);
    


    const comments = await Comment.find({ hotel: hotelId })
    console.log(comments);

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
    const hotelId = req.params.hotelId;
    console.log(hotelId);


    

    const comment = await Comment.create({
        comment: req.body.comment,
        postedBy: req.user._id, 
        hotel: hotelId,
    });
    // console.log(req.body.comment);
    
    
    
    const populatedComment = await Comment.findById(comment._id).populate("postedBy", "fullname"); 
    console.log(populatedComment);

    res.status(200).json(
        new ApiResponse(200, populatedComment, "Comment added successfully")
    );
});


const updateComment = asyncHandler(async (req, res) => {
    const commentId = req.params.commentId;

    const comment = await Hotel.comments.findByIdAndUpdate(
        commentId,
        req.body,
        { new: true }
    )

    res.status(200)
        .json(
            new ApiResponse(
                200,
                comment,
                "Comment updated successfully"
            )
        )
})

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
    updateComment,
    deleteComment,
}




