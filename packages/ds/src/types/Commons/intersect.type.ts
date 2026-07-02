export type TObserveHandler = (
    isIntersecting: boolean,
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
) => void
