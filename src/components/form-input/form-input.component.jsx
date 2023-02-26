import './form-input.styles.scss'

const FormInput = ({label, ...otherProps}) => {
    return (
        <div className="group">
            <input className="form-input" { ...otherProps } />
            {
                label && (//se o label existir cria o campo label
                    <label 
                    className={`${otherProps.value ? 'shrink' : ''} form-input-label`}>
                        {label}
                    </label>
                )
            }
        </div>
        )
}

export default FormInput