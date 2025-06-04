/* eslint-disable @typescript-eslint/no-empty-object-type */
import "styled-components";
import { ThemeType } from "brick-theme-ui";

/**
 * 1. Extendemos DefaultTheme para que incluya todas las propiedades
 *    definidas en ThemeType.
 */
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}