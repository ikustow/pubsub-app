import { NavBarComp } from '../../../src/components/nav-bar/nav-bar';
import styles from './route.module.scss';
import { UserInfoCard } from '../../../src/components/user-info-card/user-info-card';

export default function Settings() {

  const userInfo = {
    name: 'John Doe',
    id: 'abcd1234efgh5678',
    nickname: 'Johnny',
  };

  return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <UserInfoCard  id={userInfo.id} name={userInfo.name} nickname={userInfo.nickname}/>
            </div>
            <NavBarComp />
        </div>
    );
}
