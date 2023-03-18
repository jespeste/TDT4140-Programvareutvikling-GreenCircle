/**
 * A class representing a review of a user
 * @class
 */
class Review {
    /**
     * Creates a review
     * @param {*} rating - Rating of user.
     * @param {*} description - Review of user.
     * @param {*} reviewer - The reviewing user.
     * @param {*} reviewedUser - The reviewed user.
     * @param {*} reviewedPost - The reviewed post.
     */
    constructor(rating, description, reviewer, reviewedUser, reviewedPost) {
        this.setDescriptipon(description);
        this.setRating(rating);
        this.setReviewer(reviewer);
        this.setReviewedUser(reviewedUser);
        this.setReviewedPost(reviewedPost);
    }
    
    setRating(rating) {
        this.rating = rating;
    }

    setDescriptipon(description) {
        this.description = description;
    }

    setReviewer(reviewer) {
        this.reviewer = reviewer;
    }

    setReviewedUser(reviewedUser) {
        this.reviewedUser = reviewedUser;
    }

    setReviewedPost(reviewedPost) {
        this.reviewedPost = reviewedPost;
    }
}

export default Review;