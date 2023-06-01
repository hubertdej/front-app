import { useState, useEffect, useMemo } from 'react';
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

export function useDesignTokens(tokenIds: TokenId[], target: HTMLElement = document.body) {
  const [tokenValues, setTokenValues] = useState<string[]>(() => tokenIds.map(tokenId => computeTokenValue(tokenId, target)));
  const mode = useVisualMode(target);

  useEffect(() => {
    setTokenValues(tokenIds.map(tokenId => computeTokenValue(tokenId, target)));
  }, [tokenIds, target, mode]);

  return tokenValues;
}

export function useDesignToken(tokenId: TokenId, target: HTMLElement = document.body) {
  const tokenIdMemoed = useMemo(() => [tokenId], [tokenId]);
  return useDesignTokens(tokenIdMemoed, target)[0];
}
