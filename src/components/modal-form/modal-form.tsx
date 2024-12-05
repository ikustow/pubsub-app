import styles from './modal-form.module.scss';
import cx from 'classnames';
import { useState, useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';
import { handleSubmit } from '~/utils/api/handleSubmit';


export interface ModalFormProps {
  className?: string;
  onClose: () => void;
}

export const ModalForm = ({ className, onClose }: ModalFormProps) => {
  const [reason, setReason] = useState('');
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>('today');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <FocusTrap>
      <div
        className={cx(styles.overlay, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть модальное окно"
          >
            ×
          </button>
          <h2 id="modal-title" className={styles.title}>
            Отправить заявку
          </h2>
          <div className={styles.formGroup}>
            <label htmlFor="reason" className={styles.label}>
              Причина:
            </label>
            <textarea
              id="reason"
              ref={textareaRef}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Введите причину..."
              className={styles.textarea}
              required
              aria-required="true"
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dateSelect" className={styles.label}>
              Выберите дату:
            </label>
            <select
              id="dateSelect"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value as 'today' | 'tomorrow')}
              className={styles.select}
              required
              aria-required="true"
            >
              <option value="today">Сегодня</option>
              <option value="tomorrow">Завтра</option>
            </select>
          </div>
          <button
            className={styles.submitButton}
            onClick={() => handleSubmit(reason, selectedDate, onClose)}
          >
            Отправить заявку
          </button>
        </div>
        <div
          className={styles.background}
          onClick={onClose}
          aria-hidden="true"
        ></div>
      </div>
    </FocusTrap>
  );
};

export default ModalForm;
