import filter from 'leo-profanity';

const UsersMessage = ({ message }) => {
  const clearedMsg = filter.clean(message.body);

  return (
    <div
      className="d-flex"
      style={{ justifyContent: 'flex-start' }}
    >
      <div
        className="d-flex flex-column m-1 p-1 text-break mb-1"
        style={{
          color: 'white',
          maxWidth: '75%',
          borderTopRightRadius: '10px 10px',
          borderBottomRightRadius: '10px 10px',
          borderTopLeftRadius: '10px 10px',
          backgroundColor: '#b0695f',
        }}
      >
        <span>
          <b>{message.username}</b>
          :
          {' '}
          {clearedMsg}
        </span>
        <span style={{ textAlign: 'end', fontSize: '0.8em' }}>{`${message.time.hours}:${message.time.minutes}`}</span>
      </div>
    </div>
  );
};

const OtherUsersMessage = ({ message }) => {
  const clearedMsg = filter.clean(message.body);

  return (
    <div
      className="d-flex"
      style={{ justifyContent: 'flex-end' }}
    >
      <div
        className="d-flex m-1 p-1 text-break mb-2"
        style={{
          maxWidth: '75%',
          borderTopLeftRadius: '10px 10px',
          borderBottomLeftRadius: '10px 10px',
          borderTopRightRadius: '10px 10px',
          backgroundColor: '#ffebdc',
        }}
      >
        <span>
          <b>{message.username}</b>
          :
          {' '}
          {clearedMsg}
        </span>
        <span style={{ textAlign: 'end', fontSize: '0.8em' }}>{`${message.time.hours}:${message.time.minutes}`}</span>
      </div>
    </div>
  );
};

const Message = ({ message }) => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const userName = JSON.parse(localStorage.getItem('userId')).username;
  const isUser = userName === message.username;

  return isUser ? <UsersMessage message={message} /> : <OtherUsersMessage message={message} />;
};

export default Message;
