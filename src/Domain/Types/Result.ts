/**
 * Represents a successful operation result
 */
interface Success<T> {
    success: true;
    data: T;
}

/**
 * Represents a failed operation result
 */
interface Failure<E> {
    success: false;
    error: E;
}

/**
 * Union type representing the result of an operation that can either succeed or fail
 * @template E The type of the error in case of failure
 * @template T The type of the data in case of success
 */
export type Result<E, T> = Success<T> | Failure<E>;
