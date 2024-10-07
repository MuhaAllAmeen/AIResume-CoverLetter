import React from "react";

interface ModalProps{
    closeOnOutsideClick:boolean
    onRequestClose:()=>void;
    open:boolean
    children:React.ReactNode
}
export const Modal:React.FC<ModalProps>=({ closeOnOutsideClick, onRequestClose, open, children }) =>{
    const dialogRef = React.useRef<HTMLDialogElement | null>(null); // Specify the type for dialogRef
    const lastActiveElement = React.useRef<HTMLElement | null>(null); // Updated type definition
// ... existing code ...  
const firstRender = React.useRef(true);


  React.useEffect(() => {
    // prevents calling imperative methods on mount since the polyfill will throw an error since we are not using the `open` attribute
    if (firstRender.current) {
      firstRender.current = false;
    } else {
        const dialogNode = dialogRef.current as unknown as HTMLDialogElement; // Explicitly cast to HTMLDialogElement
        if (open) {
        lastActiveElement.current = document.activeElement as HTMLElement;
        dialogNode?.showModal();
      } else {
        dialogNode?.close();
        lastActiveElement.current?.focus();
      }
    }
  }, [open]);

  React.useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (event:any) => {
      event.preventDefault();
      onRequestClose();
    };
    dialogNode?.addEventListener("cancel", handleCancel);
    return () => {
      dialogNode?.removeEventListener("cancel", handleCancel);
    };
  }, [onRequestClose]);

  function handleOutsideClick(event:any) {
    const dialogNode = dialogRef.current;
    if (closeOnOutsideClick && event.target === dialogNode) {
      onRequestClose();
    }
  }

  return (
    <dialog ref={dialogRef} className=" bg-white rounded-xl shadow-xl" onClick={handleOutsideClick}>
      {React.isValidElement(children) ? React.cloneElement(children) : children}
      </dialog>
  );
}
