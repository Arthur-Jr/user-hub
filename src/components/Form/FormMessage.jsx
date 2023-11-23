import PropTypes, { element } from 'prop-types';
import { twMerge } from 'tailwind-merge';

export function FormMessage({ message, ...rest }) {

  if(!message.length === 0) {
    return null;
  }

  return (
    <span className={ twMerge("text-xs font-bold italic mt-[4px] text-black text-center col-span-1 col-start-2", rest.className) }>
      {message}
    </span>
  )
}

FormMessage.propTypes = {
  message: PropTypes.string.isRequired,
  rest: PropTypes.instanceOf(element),
};
