import type { SelectType } from "../features/tasks/types";
export function Select({ options, value, onChange }: SelectType) {
  return (
    <select value={value} onChange={onChange}>
      {options.map((item) => (
        <option value={item.value}>{item.label}</option>
      ))}
    </select>
  );
}
