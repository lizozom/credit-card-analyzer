import { existsSync, mkdirSync } from 'fs';

export function ensureOutputDir(dir: string) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}
