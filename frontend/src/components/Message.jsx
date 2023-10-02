import filter from 'leo-profanity';

const Message = ({ message }) => {
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  const clearedMsg = filter.clean(message.body);
  return (
    <div className="text-break mb-2">
      <b>{message.username}</b>
      :{' '}
      {clearedMsg}
    </div>
  )
}

export default Message;