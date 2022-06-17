import React, { useContext, useCallback, useEffect } from 'react';
import { ThemeContext } from '../theme';
import styles from '../style.css';
import { BarProps } from '../typings';
import { useHover } from '../effects';
import cx from 'classnames';

const Bar = ({
  onDoubleClick,
  onHover,
  children,
  bottomBar,
  className,
}: BarProps) => {
  const {
    platform,
    bar: {
      height,
      borderBottom,
      background,
      fontFamily,
      color,
    },
    menu: {
      style,
    }
  } = useContext(ThemeContext);
  const [ref, hovering] = useHover<HTMLDivElement>();
  const dblClick = useCallback((e) => {
    if (e.target === ref.current) {
      onDoubleClick && onDoubleClick(e);
    }
  }, [ref.current, onDoubleClick]);
  useEffect(() => {
    onHover?.(hovering);
  }, [hovering, onHover]);
  const isDarwin = platform === 'darwin';
  return (
    <div
      className={cx(styles.Bar, className)}
      ref={ref}
      style={{
        padding: isDarwin ? '0 70px' : 0,
        borderBottom: (style === 'stacked' && !bottomBar) ? '' : borderBottom,
        background,
        color,
        height,
        fontFamily,
      }}
      onDoubleClick={dblClick}
    >
      {children}
    </div>
  );
};

export default Bar;
