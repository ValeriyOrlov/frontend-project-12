import { useSelector } from 'react-redux';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const ModalWindow = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const { isOpened, type, extra } = useSelector((state) => state.modal);
  if (!type) {
    return null;
  }

  const modals = {
    addChannel: Add,
    removeChannel: Remove,
    renameChannel: Rename,
  };
  const Component = modals[type];
  return <Component channels={channels} isOpened={isOpened} type={type} extra={extra} />;
};

export default ModalWindow;
