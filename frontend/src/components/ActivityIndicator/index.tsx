import { PulseLoader, ClipLoader } from 'react-spinners';

interface ActivityIndicatorProps {
  color?: 'white' | 'blue' | 'gray';
  sizeActivity?: 'small' | 'large' | 'medium';
  type?: 'clip' | 'pulse';
  isLoading: boolean;
}

export function ActivityIndicator({
  sizeActivity = 'small',
  color = 'white',
  isLoading,
  type = 'clip',
}: ActivityIndicatorProps) {
  const getSizeActivity = {
    small: 5,
    medium: 10,
    large: 20,
  };

  const colorSpinner = {
    white: 'var(--white)',
    blue: 'var(--blue_500)',
    gray: 'var(--gray_200)',
  };

  return type === 'clip' ? (
    <ClipLoader
      color={colorSpinner[color]}
      loading={isLoading}
      size={getSizeActivity[sizeActivity]}
      data-testid="indicatorClipComponent"
    />
  ) : (
    <PulseLoader
      color={colorSpinner[color]}
      loading={isLoading}
      size={getSizeActivity[sizeActivity]}
      data-testid="indicatorPulseComponent"
    />
  );
}
