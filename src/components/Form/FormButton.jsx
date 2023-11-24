import PropTypes, { element } from 'prop-types';
import { twMerge } from 'tailwind-merge';

export function FormButton(props) {
  return (
    <button
      className={ twMerge("text-2xl font-extrabold italic bg-white border-2 border-black p-3 w-[200px] uppercase text-primary-color rounded-md hover:scale-105", props.className) }
      {...props}
    />
  )
}

FormButton.propTypes = {
  props: PropTypes.instanceOf(element),
};