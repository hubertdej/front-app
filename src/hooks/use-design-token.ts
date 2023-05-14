import { useState, useEffect } from 'react';
import { useVisualMode } from './use-visual-mode';
import * as designTokens from '@cloudscape-design/design-tokens';

export type TokenId = keyof typeof designTokens;

function computeTokenValue(tokenId: TokenId, target: HTMLElement = document.body) {
  const variableName = `--token-${tokenId}`;
  target.style.setProperty(variableName, designTokens[tokenId]);
  const value = getComputedStyle(target).getPropertyValue(variableName);
  target.style.removeProperty(variableName);
  return value;
}

export function useDesignToken(tokenId: TokenId, target: HTMLElement = document.body) {
  const [tokenValue, setTokenValue] = useState<string>(() => computeTokenValue(tokenId, target));
  const mode = useVisualMode(target);

  useEffect(() => {
    setTokenValue(computeTokenValue(tokenId, target));
  }, [tokenId, target, mode]);

  return tokenValue;
}
