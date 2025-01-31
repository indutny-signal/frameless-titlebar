import React, { useEffect, useReducer, useState } from 'react';
import MenuButton from './menu-button';
import {
  useChildRefs,
  useWidth,
  usePrevious,
  useAccessibility
} from '../effects';
import reducer, { initialState } from './reducer';
import { MenuIcon } from './icons';
import { VerticalMenuProps, MenuItem } from '../typings';

const menuButton = (menu: MenuItem[]): MenuItem => {
  return {
    id: 'menu-button',
    label: 'Menu',
    submenu: menu
  };
};

const depth = 0;
const VerticalMenu = ({ menu, focused, currentWindow, onOpen, onButtonHover }: VerticalMenuProps) => {
  const [fixedMenu, updateFixedMenu] = useState<MenuItem[]>([menuButton(menu)]);
  const childRefs = useChildRefs<HTMLButtonElement>(fixedMenu);
  const width = useWidth();
  const prevWidth = usePrevious(width);
  const [{ selectedPath, hovering }, dispatch] = useReducer(reducer, initialState);
  const isOpen = selectedPath[depth] >= 0;

  useEffect(() => {
    // close menu when focused away from window
    // close menu when resizing the window
    if ((!focused && selectedPath[depth] >= 0) || prevWidth !== width) {
      dispatch({ type: 'reset' });
    }
  }, [focused, width]);

  useEffect(() => {
    updateFixedMenu([menuButton(menu)]);
  }, [menu]);

  useEffect(() => {
    onOpen?.(isOpen);
  }, [isOpen, onOpen]);

  useEffect(() => {
    onButtonHover?.(hovering);
  }, [hovering, onButtonHover]);

  useAccessibility(
    fixedMenu,
    childRefs,
    selectedPath,
    dispatch,
    undefined,
    undefined,
    currentWindow,
  );

  if ((fixedMenu[0].submenu?.length ?? 0) === 0) {
    return null;
  }

  return (
    <MenuButton
      ref={childRefs[0]}
      focused={focused}
      idx={0}
      item={fixedMenu[0]}
      currentWindow={currentWindow}
      depth={depth}
      selectedPath={selectedPath}
      dispatch={dispatch}
      icon={<MenuIcon />}
      altKey={false}
    />
  );
};

export default VerticalMenu;
