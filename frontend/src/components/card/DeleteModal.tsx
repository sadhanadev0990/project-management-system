import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import './deleteModal.scss';

interface ModalProps {
	show: boolean;
	onHide: () => void;
	projectId: string;
	onSubmitForm: Function;
}

export const DeleteModal: React.FC<ModalProps> = ({
	show,
	onHide,
	projectId,
	onSubmitForm
}) => {
	return (
		<div className="delete-modal-container">
			<Modal
				show={show}
				onHide={onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				className="modal-container"
			>
				<Modal.Header closeButton>
					<Modal.Title
						id="contained-modal-title-vcenter"
						className="modal-title"
					>
						Delete project
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure want to delete project permanantly?{' '}
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="lg"
						variant="outline-secondary"
						className="cancel-btn"
						onClick={() => onHide()}
					>
						Cancel
					</Button>
					<Button
						size="lg"
						className="delete-btn"
						onClick={() => onSubmitForm(projectId)}
					>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
