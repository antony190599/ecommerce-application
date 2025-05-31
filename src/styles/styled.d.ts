/* eslint-disable @typescript-eslint/no-empty-object-type */
import "styled-components";
import { ThemeType } from "./theme";

/**
 * 1. Extendemos DefaultTheme para que incluya todas las propiedades
 *    definidas en ThemeType.
 */
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}