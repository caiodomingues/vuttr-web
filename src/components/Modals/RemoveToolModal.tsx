import React from "react";
import Modal from "react-modal";
import { ReactComponent as Close } from "../../assets/img/icon-close.svg";

interface RemoveToolModalProps {
  props: {
    id: number;
    deleteModalOpen: boolean;
    handleCloseDeleteModal: any;
    handleDeleteTool: Function;
    name: string;
  };
}

function RemoveToolModal({ props }: RemoveToolModalProps) {
  return (
    <Modal
      isOpen={props.deleteModalOpen}
      onRequestClose={props.handleCloseDeleteModal}
      contentLabel="Delete modal"
      className="modal"
      overlayClassName="overlay"
    >
      <form onSubmit={(evt) => props.handleDeleteTool(evt, props.id)}>
        <h4>
          <Close /> Remove tool
        </h4>
        <p>
          Are you sure you want to remove <b>{props.name}</b>?
        </p>
        <button className="danger" type="submit">
          Yes, remove
        </button>
        <button
          className="secondary"
          type="button"
          onClick={props.handleCloseDeleteModal}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default RemoveToolModal;
