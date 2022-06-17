import React, { useContext, useRef, useCallback, useState } from 'react';
import { ThemeContext } from '../theme';
import HorizontalMenu from './horizontal';
import VerticalMenu from './vertical';
import { useMenu } from '../effects';
import styles from '../style.css';
import { MenuBarProps } from '../typings';

const MenuBar = ({ menu, focused, hovering, currentWindow }: MenuBarProps) => {
  const {
    platform,
    menu: {
      style,
      autoHide,
    }
  } = useContext(ThemeContext);
  const menuBar = useRef<HTMLDivElement>(null);
  const currentMenu = useMenu(platform, menu);
  const [open, setOpen] = useState(false);
  const onOpen = useCallback((open) => {
    setOpen(open);
  }, [setOpen]);

  return (
    <div
      className={styles.MenuBar}
      role="menubar"
      ref={menuBar}
      style={{ opacity: autoHide && !hovering && !open ? 0 : 1 }}
    >
      {style === 'vertical' ? (
        <VerticalMenu
          menu={currentMenu}
          focused={focused}
          currentWindow={currentWindow}
          onOpen={onOpen}
        />
      )
        : (
          <HorizontalMenu
            menu={currentMenu}
            menuBar={menuBar}
            focused={focused}
            currentWindow={currentWindow}
            onOpen={onOpen}
          />
        )}
    </div>
  );
};

export default MenuBar;
