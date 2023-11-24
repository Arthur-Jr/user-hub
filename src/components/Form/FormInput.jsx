import PropTypes, { element } from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function FormInput(props) {
  const { register } = useFormContext();

  return (
    <input
      id={ props.name }
      className={ twMerge("mt-2 text-black p-2 rounded-md w-full border-2 border-black", props.className) }
      {...props}
      { ...register(props.name) }
    />
  )
}

FormInput.propTypes = {
  props: PropTypes.instanceOf(element),
};
