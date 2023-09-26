export type SetValue<T> = T | ((prevState: T) => T);
