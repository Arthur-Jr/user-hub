import PropTypes, { element } from 'prop-types';
import { twMerge } from 'tailwind-merge';

export function FormField(props) {
  return (
    <div
    {...props}
    className={ twMerge("w-full flex flex-col items-center", props.className) }
    />
  )
}

FormField.propTypes = {
  props: PropTypes.instanceOf(element),
};
