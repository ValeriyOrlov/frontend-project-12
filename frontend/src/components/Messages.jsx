import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = () => {
  const { messages } = useSelector((state) => state.messagesInfo);
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const messagesFromCurrentChannel = messages
    .filter((message) => message.channelId === currentChannelId);

  return (
    <>
      {
        messagesFromCurrentChannel
          .map((message) => <Message key={message.id} message={message} />)
      }
    </>
  );
};

export default Messages;
