import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollState {
  isAtBottom: boolean;
  autoScrollEnabled: boolean;
}

interface UseAutoScrollOptions {
  offset?: number;
  smooth?: boolean;
  content?: React.ReactNode;
}

export function useAutoScroll(options: UseAutoScrollOptions = {}) {
  const { offset = 20, smooth = false, content } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastContentHeight = useRef(0);
  const userHasScrolled = useRef(false);

  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtBottom: true,
    autoScrollEnabled: true,
  });

  const checkIsAtBottom = useCallback(
    (element: HTMLElement) => {
      const { scrollTop, scrollHeight, clientHeight } = element;
      const distanceToBottom = Math.abs(scrollHeight - scrollTop - clientHeight);
      return distanceToBottom <= offset;
    },
    [offset]
  );

  const scrollToBottom = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    if (smooth) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      });
    } else {
      element.scrollTop = element.scrollHeight;
    }

    userHasScrolled.current = false;
    setScrollState(prev => ({
      ...prev,
      isAtBottom: true,
      autoScrollEnabled: true,
    }));
  }, [smooth]);

  const disableAutoScroll = useCallback(() => {
    userHasScrolled.current = true;
    setScrollState(prev => ({
      ...prev,
      autoScrollEnabled: false,
    }));
  }, []);

  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const isAtBottom = checkIsAtBottom(element);

    setScrollState(prev => ({
      ...prev,
      isAtBottom,
      autoScrollEnabled: isAtBottom || !userHasScrolled.current,
    }));
  }, [checkIsAtBottom]);

  // Auto-scroll when content changes
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const currentHeight = element.scrollHeight;
    const heightChanged = currentHeight !== lastContentHeight.current;

    if (heightChanged && scrollState.autoScrollEnabled) {
      scrollToBottom();
    }

    lastContentHeight.current = currentHeight;
  }, [content, scrollState.autoScrollEnabled, scrollToBottom]);

  // Set up scroll event listener
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => element.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    scrollRef,
    isAtBottom: scrollState.isAtBottom,
    autoScrollEnabled: scrollState.autoScrollEnabled,
    scrollToBottom,
    disableAutoScroll,
  };
}
