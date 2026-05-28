/**
 * Format margin styles var.
 *
 * @param values …
 */
export function formatMarginStylesVar (values: Array<string>) {
    const styles = []

    switch (values.length) {
        case 1 :
            styles.push(`margin: ${values[0]}`)
            break
        case 4 :
            styles.push(`margin-block-start: ${values[0]}`)
            styles.push(`margin-block-end: ${values[2]}`)
            styles.push(`margin-inline-start: ${values[1]}`)
            styles.push(`margin-inline-end: ${values[3]}`)
            break
    }

    return styles
}
