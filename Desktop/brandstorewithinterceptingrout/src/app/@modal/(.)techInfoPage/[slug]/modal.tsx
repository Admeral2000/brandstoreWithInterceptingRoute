'use client';
import cls from '@/styles/modal.module.css'
import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export  function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className={cls.modalBackdrop}>
      <dialog ref={dialogRef} className={`${cls.modal} gap-40`} onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} className={cls.closeButton} />
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
