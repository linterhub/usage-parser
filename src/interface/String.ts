interface String {
    /**
     * Run RegExp for line and return first match if it exist
     * @param {string | undefined} line - The string for searching
     * @return {string | undefined} - The first match of results, default is `undefined`
     */
    firstMatch(line: string | undefined): string | undefined;
}
