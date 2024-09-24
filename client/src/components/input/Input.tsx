interface Props {
    label: string,
    type: string,
    value: string,
    setValue: (value: string) => void,
}

export default function Input({ label, type, value, setValue }: Props) {
  return (
        <label>
            { label }
            <input
                type={ type }
                value={value}
                onChange={(e) => setValue(e.target.value)} />
        </label>
    )
};