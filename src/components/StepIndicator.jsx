export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="flex items-center mb-6">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  isCompleted
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-blue-800 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={`mt-1 text-xs font-medium ${
                  isActive ? "text-blue-800" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber !== steps.length && (
              <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? "bg-green-600" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}