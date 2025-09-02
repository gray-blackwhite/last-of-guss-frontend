export type FactoryFn<T> = () => T;

export class Observer<TData> {
  private data: TData | undefined;
  private readonly callbacks: (() => void)[] = [];
  private readonly factory: FactoryFn<TData>;
  public readonly name: string;

  constructor(
    name: string,
    factory: FactoryFn<TData>,
  ) {
    this.name = name;
    this.factory = factory;
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  public setData(data: TData | undefined): void {
    this.data = data;
    this.notifySubscribers();
  }

  public getData(): TData {
    return this.data ? this.data : (this.data = this.factory());
  }

  public processData(callback: (data: TData) => boolean): void {
    const data = this.getData();
    if (callback(data)) {
      this.notifySubscribers();
    }
  }

  public subscribe(callback: () => void): void {
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback);
    }
  }

  public unsubscribe(callback: () => void): void {
    if (this.callbacks.includes(callback)) {
      this.callbacks.splice(this.callbacks.indexOf(callback), 1);
    }
  }

  private notifySubscribers(): void {
    this.callbacks.forEach((callback) => callback());
  }
}