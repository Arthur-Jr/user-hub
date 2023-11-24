import PropTypes, { element } from 'prop-types';
import { twMerge } from 'tailwind-merge';

export function FormLabel(props) {
  return (
    <label
      {...props}
      className={ twMerge("flex flex-col items-center text-xl font-bold italic uppercase w-[75%] text-center", props.className) }
    />
  )
}

FormLabel.propTypes = {
  props: PropTypes.instanceOf(element),
};
