interface Success<T> {
    success: true;
    data: T;
}

interface Failure<E> {
    success: false;
    error: E;
}

export type Result<E, T> = Success<T> | Failure<E>;
