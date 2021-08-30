import { IconBaseProps } from "react-icons";

interface checkButtonSchema {
  error: boolean;
  active: boolean;
  heading: string | undefined;
  label?: string;
  icon: IconBaseProps;
  onClick: (e?: any) => void;
}

const ExtrasButton = (props: checkButtonSchema) => {
  const { active, heading, label, onClick, icon, error } = props;

  return (
    <div
      // ref={ref}
      title={heading}
      role="button"
      className={`extras-button ${active ? "extras-active-button" : undefined}`}
      onClick={onClick}
    >
      <h3>{heading}</h3>
      <span className={"extras-button-details"}>
        <span style={error ? { color: "red" } : undefined}>{icon}</span>

        <label style={error ? { color: "red" } : undefined}>{label}</label>
      </span>
    </div>
  );
};

export default ExtrasButton;
// ----------------><---------------
