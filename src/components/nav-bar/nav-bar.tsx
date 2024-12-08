import styles from './nav-bar.module.scss';
import cx from 'classnames';
import { useRef, useState } from 'react';
import ModalForm from '../modal-form/modal-form';

export interface NavBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NavBarComp = ({ className }: NavBarProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openModalButtonRef = useRef<HTMLButtonElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        if (openModalButtonRef.current) {
            openModalButtonRef.current.focus();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        if (menuButtonRef.current) {
            menuButtonRef.current.focus();
        }
    };

    return (
        <>
            <nav className={cx(styles.root, className, styles.nav1)}>
                <a href="/" className={styles.a1}>
                    Home
                </a>
                <div className={cx(styles.navLinks, { [styles.active]: isMenuOpen })}>
                    <button
                        className={cx(styles.openModalButton, styles.button1)}
                        onClick={openModal}
                        ref={openModalButtonRef}
                    >
                        +
                    </button>
                </div>
                <a href="/Settings" className={styles.a2}>
                    Settings
                </a>
            </nav>
            {isModalOpen && <ModalForm onClose={closeModal} />}
        </>
    );
};

export default NavBarComp;
