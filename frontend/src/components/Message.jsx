import filter from 'leo-profanity';

const UsersMessage = ({ message }) => {
  const clearedMsg = filter.clean(message.body);

  return (
    <div
      className="d-flex"
      style={{ 'justify-content': 'flex-start' }}
    >
      <div
        className="d-flex m-1 p-1 text-break mb-2"
        style={{
          color: 'white',
          maxWidth: '75%',
          border: '1px solid #ffebdc',
          'border-top-right-radius': '10px 10px',
          'border-bottom-right-radius': '10px 10px',
          'border-top-left-radius': '10px 10px',
          'background-color': '#b0695f',
          opacity: '0.85',
        }}
      >
        <p>
          <b>{message.username}</b>
          :
          {' '}
          {clearedMsg}
        </p>
      </div>
    </div>
  );
};

const OtherUsersMessage = ({ message }) => {
  const clearedMsg = filter.clean(message.body);

  return (
    <div
      className="d-flex"
      style={{ 'justify-content': 'flex-end' }}
    >
      <div
        className="d-flex m-1 p-1 text-break mb-2"
        style={{
          maxWidth: '75%',
          border: '1px solid #b0695f',
          'border-top-left-radius': '10px 10px',
          'border-bottom-left-radius': '10px 10px',
          'border-top-right-radius': '10px 10px',
          'background-color': '#ffebdc',
          opacity: '0.85',
        }}
      >
        <p>
          <b>{message.username}</b>
          :
          {' '}
          {clearedMsg}
        </p>
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
