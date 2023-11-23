import PropTypes, { element } from 'prop-types';
import { twMerge } from 'tailwind-merge';

export function FormLabel(props) {
  return (
    <label
      className={ twMerge("flex flex-col items-center text-xl font-bold italic uppercase w-[75%]", props.className) }
      {...props}
    />
  )
}

FormLabel.propTypes = {
  props: PropTypes.instanceOf(element),
};
