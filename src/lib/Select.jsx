import Select from "react-select";
import PropTypes from "prop-types";


function SelectMenu(props) {
    return (
        <Select
            {...props}
            styles={{
                control: (styles) => ({
                    ...styles,
                    borderColor: undefined,
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: undefined,
                    },
                }),
                option: (styles) => ({
                    ...styles,
                    backgroundColor: undefined,
                    color: undefined,
                }),
                multiValue: (styles) => ({
                    ...styles,
                    backgroundColor: undefined,
                    borderRadius: undefined,
                }),
                multiValueRemove: (styles) => ({
                    ...styles,
                    ':hover': {
                        backgroundColor: undefined,
                        transform: 'scale(1.2)',
                    },
                }),
            }}

            classNames={{
                control: (state) => state.isFocused ? 'gc-border-green' : props.isGreen ? 'gc-border-green' : undefined,
                option: (state) => state.isFocused ? 'gc-bg-green-light' : undefined,
                multiValue: () => 'border gc-border-green rounded-md',
            }}

            options={props.options}
        />
    )
}

SelectMenu.propTypes = {
    isGreen: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
    }))
}

export default SelectMenu;