import {Client as UsageParser} from './src/client';
import {Group} from './src/models/group';
import {Usage} from './src/models/usage';
import {Section} from './src/models/section';
import {Argument} from './src/models/argument';
import {ArgumentType} from './src/types/argumentType';

import { UsageInterface } from './src/interface/Usage';
import { SectionInterface } from './src/interface/Section';
import { CommandInterface } from './src/interface/Command';
import { ArgumentInterface } from './src/interface/Argument';

// tslint:disable-next-line:no-default-export
export default UsageParser;
export {
    Usage, Group, Section, Argument, ArgumentType,
    UsageInterface, SectionInterface, CommandInterface, ArgumentInterface
};
