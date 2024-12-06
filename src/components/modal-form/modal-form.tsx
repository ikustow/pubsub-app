import styles from './modal-form.module.scss';
import cx from 'classnames';
import { useState, useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';


export interface ModalFormProps {
    className?: string;
    onClose: () => void;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
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

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Пожалуйста, введите причину.');
      return;
    }
    if (!selectedDate) {
      alert('Пожалуйста, выберите дату.');
      return;
    }
    // Обработка отправки данных
    console.log('Reason:', reason);
    console.log('Selected Date:', selectedDate);

 /*   const messageData = {
      reason: reason,           // Убедимся, что reason обработан
      selectedDate: selectedDate,      // Значение выбранной даты
      timestamp: selectedDate,
    };
*/

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*/*");
    myHeaders.append("Accept", "*/*");


    const messageData = {
      "reason": "Hello World",
      "selectedDate": "today",
      "timestamp": "Hello World",
    };

    const raw = JSON.stringify(messageData);


    try {
      console.log(JSON.stringify(messageData));
      const response = await fetch('https://us-central1-ff-vacation-manager-g8xdvb.cloudfunctions.net/pubsub-submit', { // Замените на URL функции
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      });

      if (response.ok) {
        alert('Заявка успешно отправлена.');
      } else {
        alert('Ошибка отправки заявки.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Ошибка отправки заявки.');
    }
    onClose();
  };

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
          <button className={styles.submitButton} onClick={handleSubmit}>
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
