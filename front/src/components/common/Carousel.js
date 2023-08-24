import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const CarouselWrapper = ({ imageUrls, setReview }) => {
  // 업로드, 수정 할 때 삭제버튼 누르면 하나씩 제거
  const removeUrl = (index) => {
    const newImageUrls = imageUrls.filter((_, idx) => index !== idx);
    setReview((current) => ({ ...current, imageUrls: newImageUrls }));
  };

  return (
    <Carousel
      className="carousel px-0"
      interval={null}
      variant="dark"
      indicators={imageUrls.length > 1}
      prevIcon={
        <FontAwesomeIcon icon={faArrowLeft} className="carousel-arrow-icon" />
      }
      nextIcon={
        <FontAwesomeIcon icon={faArrowRight} className="carousel-arrow-icon" />
      }
    >
      {imageUrls.map((img, index) => (
        <Carousel.Item key={img}>
          <Image src={`http://localhost:5001/imageUpload/${img}`} fluid />
          {setReview && (
            <Carousel.Caption className="d-flex justify-content-end">
              <Button variant="danger" onClick={() => removeUrl(index)}>
                삭제 <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
