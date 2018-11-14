import './../interface/String';

String.prototype.firstMatch = function(line: string| undefined): string | undefined{
    if (!line) { return undefined; }
    const regExp = new RegExp(this.toString(), 'im');
    const matches = line.match(regExp);
    return matches && matches[1] ? matches[1] : undefined;
};
