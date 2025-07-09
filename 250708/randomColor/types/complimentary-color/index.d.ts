declare module 'complimentary-color' {
  namespace compliColor {
    /**
     * Returns the complementary color of the input.
     * @param color - A string representing a color in `rgb(...)`, `hsl(...)`, or hex (`#RRGGBB`)
     * @returns A complementary color string in the same format
     */
    function process(color: string): string;
  }

  export = compliColor;
}
