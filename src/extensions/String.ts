import './../interface/String';

String.prototype.firstMatch = function(line: string| undefined): string | undefined{
    if (!line) { return undefined; }
    const regExp = new RegExp(this.toString(), 'im');
    const matches = line.match(regExp);
    return matches && matches[1] ? matches[1] : undefined;
};

String.prototype.trimEnd = function(value: string) : string {
    const cleanLine = this.trim();
    return cleanLine.endsWith(value) ? cleanLine.slice(0, cleanLine.length - 1) : cleanLine;
};

String.prototype.unify = function(): string  {
    const cleanLine = this.trim().replace(/ {2,}/gim, ' ');
    return cleanLine.charAt(0).toUpperCase() + cleanLine.slice(1);
};

String.prototype.convert = function() : boolean | number | string {
    return this === 'false' || this === 'true' ?
        this === 'true' : !isNaN(+this) ? +this : this.toString();
};
