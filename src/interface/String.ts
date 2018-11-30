interface String {
    /**
     * Run RegExp for line and return first match if it exist
     * @param {string | undefined} line - The string for searching
     * @return {string | undefined} - The first match of results, default is `undefined`
     */
    firstMatch(line: string | undefined): string | undefined;

    /**
     * Trim last char of string if it exist
     * @param {string} value - The char for trim
     * @return {string} - The string without char of the end of line
     */
    trimEnd(value: string) : string;

    /**
     * Unify string. Use trim and create first letter to uppercase.
     * @return {string} - The unified string
     */
    unify() : string;

    /**
     * Try convert string to number or boolean. Return value in that type.
     * @return {boolean | number | string} - The value in correct type: number, boolean or string
     */
    convert() : boolean | number | string;
}
