import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const ModalPortal = ({ children }: Props) => {
  return createPortal(
    children,
    document.body,
  );
};