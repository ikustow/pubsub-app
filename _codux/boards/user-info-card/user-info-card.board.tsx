import { createBoard } from '@wixc3/react-board';
import { UserInfoCard } from '../../../src/components/user-info-card/user-info-card';

export default createBoard({
    name: 'UserInfoCard',
    Board: () => <UserInfoCard />,
});
