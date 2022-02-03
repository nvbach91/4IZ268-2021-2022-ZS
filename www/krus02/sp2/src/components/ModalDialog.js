import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "65%",
    borderRadius: "20px",
  },
};

const ModalDialog = ({ children, isOpen, closeModal, title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="mx-4 my-4">
        <div className="flex flex-row items-center justify-between w-full mb-5 border-b border-blue-600">
          <span className="text-4xl font-semibold pb-2">{title}</span>
          <button onClick={closeModal}>Close</button>
        </div>
        <div>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalDialog;
