import { PromiseBox } from './PromiseBox';
import { Value } from './Value';

const TIMEOUT = 10000;

interface ResultLoading {
    readonly type: 'loading';
    readonly whenReady: Promise<void>;
}

interface ResultReady<T> {
    readonly type: 'ready';
    readonly value: T;
}

interface ResultError {
    readonly type: 'error';
    readonly message: string;
}

export type Result<T> = ResultLoading | ResultReady<T> | ResultError;

const send = <T>(loadValue: () => Promise<T>): Promise<Result<T>> => {
    return new Promise(async (resolve) => {
        setTimeout(() => {
            resolve({
                type: 'error',
                message: 'timeout',
            });
        }, TIMEOUT);

        try {
            const loadedValue = await loadValue();

            resolve({
                type: 'ready',
                value: loadedValue,
            });
        } catch (err) {
            console.error(err);

            resolve({
                type: 'error',
                message: String(err),
            });
        }
    });
};

class Request<T> {
    private isInit: boolean = false;
    public readonly whenReady: PromiseBox<void>;
    private readonly value: Value<Result<T>>;

    public constructor(private readonly getValue: () => Promise<T>, private readonly prevValue: Result<T> | null) {        
        this.whenReady = new PromiseBox<void>();

        this.value = new Value({
            type: 'loading',
            whenReady: this.whenReady.promise,
        });
    }

    public init(): void {
        if (this.isInit) {
            return;
        }

        this.isInit = true;

        const valuePromise = send(this.getValue);

        setTimeout(async () => {
            const value = await valuePromise;
            this.value.setValue(value);
            this.whenReady.resolve();
        }, 0);
    }

    public get(): Result<T> {
        const current = this.value.getValue();

        if (current.type !== 'loading') {
            return current;
        }

        if (this.prevValue !== null) {
            return this.prevValue;
        }

        return current;
    }
}

export class Resource<T> {
    private request: Value<Request<T>>;

    public constructor(private readonly loadValue: () => Promise<T>) {
        this.request = new Value(new Request(this.loadValue, null));
    }

    public get(): Result<T> {
        const request = this.request.getValue();
        request.init();
        return request.get();
    }

    public getReady(): T | null {
        const result = this.get();

        if (result.type === 'ready') {
            return result.value;
        }

        return null;
    }

    public async refresh(): Promise<void> {
        const prevValue = this.get();
        const request = new Request(this.loadValue, prevValue);
        request.init();

        this.request.setValue(request);
        await request.whenReady.promise;
    }
}
