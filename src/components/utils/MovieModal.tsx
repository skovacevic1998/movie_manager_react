import React from "react";
import { Modal } from "antd";
import { Movie } from "../../redux/types";

interface MovieModalProps {
  visible: boolean;
  onCancel: () => void;
  selectedRow: Movie | null;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  visible,
  onCancel,
  selectedRow,
}) => {
  if (!selectedRow) return null;

  return (
    <Modal
      title={<p className="vmt_modal_title">{selectedRow.title}</p>}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      className="vmt_modal"
    >
      <div>
        <div>
          <p>Year</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.year}</p>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Genre</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.genre}</p>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Description</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.description}</p>
        </div>
      </div>
      <br />

      <div className="vmt_modal_inline_content">
        <div className="vmt_modal_inline_content_p">
          <div>
            <p>Director</p>
          </div>
          <div className="vmt_highlight">
            <p className="vmt_modal_pcontent">{selectedRow.director}</p>
          </div>
        </div>

        <div>
          <div>
            <p>Actors</p>
          </div>
          <div className="vmt_highlight">
            <p className="vmt_modal_pcontent">{selectedRow.actors}</p>
          </div>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Runtime</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.runtime} min</p>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Rating</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.rating}</p>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Votes</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.votes}</p>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Revenue</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">
            ${selectedRow.revenue.toLocaleString()}
          </p>
        </div>
      </div>
      <br />
      <div>
        <div>
          <p>Metascore</p>
        </div>
        <div>
          <p className="vmt_modal_pcontent">{selectedRow.metascore}</p>
        </div>
      </div>
    </Modal>
  );
};
