import { SetStateAction } from "react";
import Modal from "react-modal";

interface CreateToolModalProps {
  props: {
    modalOpen: boolean;
    tagError: string;
    handleCloseModal: any;
    handleAddTool: any;
    setName: SetStateAction<any>;
    setDescription: SetStateAction<any>;
    setLink: SetStateAction<any>;
    setTags: SetStateAction<any>;
  };
}

function CreateToolModal({ props }: CreateToolModalProps) {
  return (
    <Modal
      isOpen={props.modalOpen}
      onRequestClose={props.handleCloseModal}
      contentLabel="Add modal"
      className="modal"
      overlayClassName="overlay"
    >
      <form onSubmit={props.handleAddTool}>
        <h4>+ Add new tool</h4>
        <div className="input-group">
          <label htmlFor="toolName">
            Tool name <span className="required">*</span>
          </label>
          <input
            onChange={(evt) => props.setName(evt.target.value)}
            type="text"
            name="tool name"
            id="toolName"
            required
            autoComplete="off"
            minLength={1}
            maxLength={25}
          />
        </div>
        <div className="input-group">
          <label htmlFor="toolLink">
            Tool link <span className="required">*</span>
          </label>
          <input
            onChange={(evt) => props.setLink(evt.target.value)}
            type="text"
            name="tool link"
            id="toolLink"
            autoComplete="off"
            required
            minLength={1}
            maxLength={200}
          />
        </div>
        <div className="input-group">
          <label htmlFor="toolName">
            Tool description <span className="required">*</span>
          </label>
          <textarea
            onChange={(evt) => props.setDescription(evt.target.value)}
            rows={4}
            name="tool description"
            id="toolDescription"
            required
            maxLength={255}
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="tags">
            Tags <span className="required">*</span>
          </label>
          <input
            onChange={(evt) => props.setTags(evt.target.value)}
            type="text"
            name="tags"
            id="tags"
            className={props.tagError && "error-input"}
            autoComplete="off"
            required
            minLength={1}
            maxLength={255}
          />
          {props.tagError && <p className="error">{props.tagError}</p>}
        </div>
        <button type="submit">Add tool</button>
      </form>
    </Modal>
  );
}

export default CreateToolModal;
