import type React from "react";
import styles from "./Modal.module.css";
import { HiX } from "react-icons/hi";

interface ModalProps {
  children: React.ReactNode;
  closeAddTaskModalHandler: () => void;
}
export function Modal({ children, closeAddTaskModalHandler }: ModalProps) {
  return (
    <section className={styles.modalOverlay} onClick={closeAddTaskModalHandler}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.btnClose}
          onClick={closeAddTaskModalHandler}
          title="Close modal"
        >
          <HiX size={20} />
        </button>

        {children}
      </div>
    </section>
  );
}
