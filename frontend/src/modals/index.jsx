import { useSelector } from 'react-redux';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const ModalWindow = () => {
  const state = useSelector((state) => state)
  const { type } = useSelector((state) => state.modal);
  if (!type) {
    return null;
  }

  const modals = {
    addChannel: Add,
    removeChannel: Remove,
    renameChannel: Rename,
  }
  const Component = modals[type];
  return <Component state={state} />
};

export default ModalWindow;