import React, { useState } from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';

interface GuidedTourProps {
  steps: Step[];
  run?: boolean;
  onClose?: () => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({ steps, run = true, onClose }) => {
  const [tourState, setTourState] = useState({
    run,
    stepIndex: 0,
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, type } = data;
    if (['finished', 'skipped'].includes(status)) {
      setTourState((s) => ({ ...s, run: false }));
      onClose?.();
    } else if (type === 'step:after') {
      setTourState((s) => ({ ...s, stepIndex: index + 1 }));
    }
  };

  return (
    <Joyride
      steps={steps}
      run={tourState.run}
      stepIndex={tourState.stepIndex}
      continuous
      showSkipButton
      showProgress
      disableScrolling
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: 'rgb(var(--primary-color))',
          backgroundColor: 'var(--card)',
          textColor: 'var(--foreground)',
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};

// Example usage:
// const steps = [
//   { target: '.dashboard-nav', content: 'This is your main navigation.' },
//   { target: '.profile-widget', content: 'Access your profile here.' },
//   { target: '.courses-section', content: 'Browse your courses here.' },
// ];
// <GuidedTour steps={steps} run={showTour} onClose={() => setShowTour(false)} /> 