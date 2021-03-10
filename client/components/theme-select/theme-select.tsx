import block from "bem-cn";
import React, { FC, memo, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadThemesList, updateTheme } from "client/redux/theme/theme-actions";
import { themeSelector } from "client/redux/theme/theme-selectors";

import "./theme-select.css";

const b = block("theme-select");

export type Props = {
  className?: string;
};

const ThemeSelect: FC<Props> = ({ className = "" }) => {
  const { list, now } = useSelector(themeSelector);
  const dispatch = useDispatch();

  const changeFunc = useCallback(
    event => {
      const id = event.target.value;
      const { text } = event.target.options[event.target.selectedIndex];
      dispatch(updateTheme({ id, theme: text }));
    },
    [dispatch],
  );

  const optionList = useMemo(() => {
    return list.map(el => {
      return (
        <option value={el.id} key={el.id}>
          {el.theme}
        </option>
      );
    });
  }, [list]);

  useEffect(() => {
    dispatch(loadThemesList());
  }, [dispatch]);

  return (
    <select className={b.mix(className)} onChange={changeFunc} value={now.id}>
      {optionList}
    </select>
  );
};

const WrappedThemeSelect = memo(ThemeSelect);
export { WrappedThemeSelect as ThemeSelect };
