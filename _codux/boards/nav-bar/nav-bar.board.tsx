import { createBoard } from '@wixc3/react-board';
import { NavBarComp } from '../../../src/components/nav-bar/nav-bar';

export default createBoard({
    name: 'NavBarComp',
    Board: () => <NavBarComp />,
    environmentProps: {
        windowWidth: 430,
        windowHeight: 932,
    },
});
