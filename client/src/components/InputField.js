// src/components/InputField.js
export default function InputField({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">{label}</label>
      <input
        type={type}
        {...props}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
