import { createBoard } from '@wixc3/react-board';
import { ModalForm } from '../../../src/components/modal-form/modal-form';

export default createBoard({
    name: 'ModalForm',
    Board: () => <ModalForm onClose={function(): void {
throw new Error('Function not implemented.');
} } />,
    environmentProps: {
        windowWidth: 390,
        windowHeight: 844,
    },
});
