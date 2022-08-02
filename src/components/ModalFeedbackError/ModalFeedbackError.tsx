import { Modal } from "react-bootstrap";
import Button from "../Button";
import Icon from "../Icon";

interface IModalFeedbackErrorProps {
  show: boolean;
  onHide: () => void;
  message: string;
}

const ModalFeedbackError = ({
  show,
  onHide,
  message,
}: IModalFeedbackErrorProps) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header>
        <Modal.Title>Atenção</Modal.Title>
        <Icon name="close" size={24} className="text-dark02" />
      </Modal.Header>
      <Modal.Body>
        <p className="text-center text-dark01">{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="main" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFeedbackError;
