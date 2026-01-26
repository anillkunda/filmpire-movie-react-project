const Dropdown = ({ title, option, onSelect }) => {
  return (
    <div className="relative w-[12em]">
      <select
        defaultValue=""
        onChange={onSelect}
        className="select w-full bg-base-tertiary text-white font-netflix-medium px-4 pr-10 rounded-lg outline-none cursor-pointer"
      >
        <option value="" disabled>
          {title}
        </option>

        {option.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Icon */}
      <ion-icon
        name="chevron-down"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none text-xl"
      />
    </div>
  );
};

export default Dropdown;
