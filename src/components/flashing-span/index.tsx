import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface FlashingSpanProps {
  value: string | number
  style?: CSSProperties
}

export function FlashingSpan({ value, style }: FlashingSpanProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const previousValueRef = useRef<string | number | null>(null);

  useEffect(() => {
    const previousValue = previousValueRef.current;
    previousValueRef.current = value;
    if (previousValue && previousValue !== value) {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 500);
    }
  }, [value]);

  return (
    <span className={`${styles.animated} ${isHighlighted ? styles.highlighted : ''}`} style={style}>
      {value}
    </span>
  );
}
