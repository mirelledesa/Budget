import { useEffect, useId, useRef, type ReactNode } from 'react';

interface InfoModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const InfoModal = ({ title, onClose, children }: InfoModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
       aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          event.currentTarget.close();
        }
      }}
      className="m-auto w-[90%] max-w-md rounded-2xl bg-white p-0 shadow-xl backdrop:bg-black/50 focus:outline-none"
    >
      <div className="px-8 py-12 text-center">
        <h2 id={titleId} className="text-lg font-bold">
          {title}
        </h2>
        <div className="mt-6 space-y-1 text-xs font-semibold leading-relaxed">{children}</div>
      </div>
    </dialog>
  );
};