import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserStateContext } from "../../App";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import ReviewFormBody from "./layout/ReviewFormBody";
import useModal, { MODAL_TYPE } from "../../hooks/useModal";
import * as Api from "../../Api";
// add review랑 형태가 같음 -> 하나로 합쳐도 될 듯?

// <ReviewTitle/>에서  '...' 버튼을 클릭 => id, review 값 modalVisible 컨텍스트에 전달
// => <ActionSelectorModal />에서 그 값을 받아서
// => 모달에 관한 컨텍스트만 변경 후 데이터를 현재 컴포넌트로 전달

// to do: 불필요한 매개변수 지울 것
const EditReview = () => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { review, setReviews } = modalVisible.data;
  // 리뷰 title, content 초기값 설정을 위해 review 정보를 가져온다
  // <Review />에서 수정 버튼 클릭 할 때 review값을 modalVisible에 저장한다
  const [userInputValues, setUserInputValues] = useState({
    title: review?.title,
    content: review?.content,
  });

  // const [files, setFiles] = useState(null);
  // const { editStatus } = useState(false);
  // const [preview, setPreview] = useState(null);
  // const {
  //   showToast,
  //   showToastPopup,
  //   toastMessage,
  //   setShowToast,
  //   toastStatus,
  //   toastPosition,
  // } = useToast();

  // const reviewId = modalVisible.data.review._id;

  // const isSuccessful = editStatus === RESULT_ENUM.SUCCESS;
  // const isFailed = editStatus === RESULT_ENUM.FAIL;
  // const isPosting = !editStatus === RESULT_ENUM.NOT_YET;
  // const isFetched = !isPosting && (isSuccessful || isFailed);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //유효성검사 중복
      // const response = await Api.put(`reviews/${reviewId}`, userInputValues);
      // if (!response.ok) {
      //   showToastPopup("데이터를 불러올 수 없습니다", TOAST_POPUP_STATUS.error);
      // }
      // showToastPopup("요청 성공!", TOAST_POPUP_STATUS.success);
      // setReviews((current) => {
      //   const currentReviews = [...current];
      //   return currentReviews.map((item) =>
      //     item._id === review._id ? { ...review, ...userInputValues } : item
      //   );
      // });
      // closeModal();
      // setUserInputValues({ title: "", content: "" });
    } catch (error) {
      // showToastPopup("정보를 불러올 수 없습니다", TOAST_POPUP_STATUS.error);
      // closeModal();
    }
  };

  return (
    <>
      <Modal
        keyboard={false}
        dialogClassName="addreview__modalWrapper" // 기본 부트스트랩 스타일 제거(max-width)
        className="px-5"
        show={modalVisible.type === MODAL_TYPE.editReview}
        onHide={() => {
          if (userInputValues.title !== "" || userInputValues.content !== "") {
            // 내용이 있다면 다시 한 번 확인하는 모달창에 표시한다
            setShowConfirmModal(true);
          } else {
            closeModal();
            setUserInputValues({ title: "", content: "" }); // 입력창 비워주기
          }
        }}
        onClick={(e) => e.stopPropagation()}
        centered
        backdrop="static"
      >
        <ModalBodyWrapper
          title="게시글 수정하기"
          content={
            <div className="addReview__form flexible-col">
              <ReviewFormBody
                review={review}
                userInputValues={userInputValues}
                setUserInputValues={setUserInputValues}
              />
            </div>
          }
        >
          {
            <Form onSubmit={onSubmit} className="addReview__form">
              <Button
                className="addreview__btn"
                variant="outline-primary"
                type="submit"
                onClick={onSubmit}
              >
                확인
              </Button>
            </Form>
          }
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default EditReview;
