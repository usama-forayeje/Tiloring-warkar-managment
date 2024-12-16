import { Input } from "@/components/ui/input";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

    export default function InputPasswordWithHookForm({
        name,
        placeholder,
        setValue,
        resetTrigger,
        ...props
      }) {
        const [password, setPassword] = useState("");
        const [isVisible, setIsVisible] = useState(false);
      
        // Toggle password visibility
        const toggleVisibility = () => setIsVisible((prevState) => !prevState);
      
        // Handle password input change
        const handlePasswordChange = (e) => {
          const newPassword = e.target.value;
          setPassword(newPassword);
          setValue(name, newPassword); // Update React Hook Form value
        };
      
        // Reset password field when resetTrigger changes
        useEffect(() => {
          if (resetTrigger) {
            setPassword("");
          }
        }, [resetTrigger]);
  // Check password strength
  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  // Calculate password strength score
  const strength = checkStrength(password);
  const strengthScore = useMemo(() => strength.filter((req) => req.met).length, [strength]);

  // Get strength bar color based on score
  const getStrengthColor = (score) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  // Get strength text based on score
  const getStrengthText = (score) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Medium password";
    return "Strong password";
  };

 

  return (
    <div>
      {/* Password input field with toggle visibility button */}
      <div className="space-y-2">
        <div className="relative">
          <Input
            {...props} // Spread other props (e.g., placeholder, className)
            id={name} // Ensure name is passed for useForm
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={strengthScore < 4}
            aria-describedby="password-strength"
          />
          <button
            className="absolute inset-y-0 flex items-center justify-center h-full transition-colors end-0 w-9 rounded-e-lg text-muted-foreground/80 outline-offset-2 hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
            ) : (
              <Eye size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Password strength indicator */}
      <div
        className="w-full h-1 mt-3 mb-4 overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}
        ></div>
      </div>

      {/* Password strength description */}
      <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
        {getStrengthText(strengthScore)}. Must contain:
      </p>

      {/* Password requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <Check size={16} className="text-emerald-500" aria-hidden="true" />
            ) : (
              <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
            )}
            <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
