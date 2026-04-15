export class Logger {
    static log(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static action(message: string) {
        console.log(`[ACTION] ${message}`);        
    }

    static error(message: string) {
        console.error(`[ERROR] ${message}`);
    }
}