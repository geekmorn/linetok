interface Button
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {}

export const Button: React.FC<Button> = ({
  children,
  onClick,
  type,
  disabled
}) => {
  return (
    <div>
      <button
        style={{
          cursor: 'pointer',
          border: '1px solid #ccc',
          padding: '10px 15px',
          width: '100%',
          minWidth: '100px',
          backgroundColor: '#fff'
        }}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  )
}
