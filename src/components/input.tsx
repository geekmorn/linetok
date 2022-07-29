type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange
}) => {
  return (
    <div>
      <input
        style={{
          border: '1px solid #ccc',
          padding: '10px 15px'
        }}
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={onChange}
      />
    </div>
  )
}
