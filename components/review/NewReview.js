import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  newReview,
  clearErrors,
  checkReviewAvailability,
} from "../../redux/actions/roomActions";
import { NEW_REVIEW_RESET } from "../../redux/constants/roomConstants";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const NewReview = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
 // console.log("Rating=>", rating);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, success } = useSelector((state) => state.newReview);
  const { reviewAvailable } = useSelector((state) => state.checkReview);

  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(checkReviewAvailability(id));
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review is posted.");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, success, error, id]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId: id,
    };

    dispatch(newReview(reviewData));
    handleClose();
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });
    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("red");
            setRating(this.starValue);
            console.log(this.starValue);
          } else {
            star.classList.remove("red");
          }
        }
        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("light-red");
          } else {
            star.classList.remove("light-red");
          }
        }
        if (e.type === "mouseout") {
          star.classList.remove("light-red");
        }
      });
    }
  }

  return (
    <>
      {reviewAvailable && (
        <Button variant="danger" className=" mt-4 mb-5" onClick={handleShow}>
          Submit Your Review
        </Button>
      )}

      <div>
        <Modal
          aria-label="ratingModal"
          show={show}
          onHide={handleClose}
          onShow={setUserRatings}
        >
          <Modal.Header closeButton>
            <Modal.Title>Submit Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="stars">
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
              <li className="star">
                <i className="fa fa-star"></i>
              </li>
            </ul>

            <textarea
              name="review"
              id="review"
              className="form-control mt-3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={submitHandler}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="stars">
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
                <li className="star">
                  <i className="fa fa-star"></i>
                </li>
              </ul>

              <textarea
                name="review"
                id="review"
                className="form-control mt-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>

              <button
                className="btn my-3 float-right review-btn px-4 text-white"
                data-dismiss="modal"
                aria-label="Close"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default NewReview;
