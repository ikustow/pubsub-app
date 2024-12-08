import styles from './user-info-card.module.scss';
import cx from 'classnames';
import { useUser } from '../../../app/helpers/UserContext';

export interface UserInfoCardProps {
    className?: string;
    name: string;
    id: string;
    nickname: string;
}

export const UserInfoCard = ({ className, name, id, nickname }: UserInfoCardProps) => {

    const { user } = useUser();

    return (
        <div className={cx(styles.root, className)}>
            <div className={styles['card-header']}>TG User Information</div>
            <div className={styles['card-body']}>
                <p>
                    <strong>Name:</strong> {user?.firstName}
                </p>
                <p>
                    <strong>LastName:</strong> {user?.lastName}
                </p>
                <p>
                    <strong>ID:</strong> {user?.id}
                </p>
                <p>
                    <strong>Username:</strong> {user?.username}
                </p>
            </div>
        </div>
    );
};
