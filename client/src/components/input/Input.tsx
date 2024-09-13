interface Props {
    label: string,
    type: string,
}

export default function Input({ label, type }: Props) {
  return (
        <label>
            { label }
            <input type={ type } />
        </label>
    )
};