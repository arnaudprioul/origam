/**
 * Format border styles var.
 *
 * @param values …
 * @param type   …
 */
export function formatBorderStylesVar (values: Array<string>, type: string) {
    const styles = []

    switch (values.length) {
        case 1 :
            styles.push(`border-${type}: ${values[0]}`)
            break
        case 2 :
            styles.push(`border-block-${type}: ${values[0]}`)
            styles.push(`border-inline-${type}: ${values[1]}`)
            break
        case 4 :
            styles.push(`border-block-start-${type}: ${values[0]}`)
            styles.push(`border-block-end-${type}: ${values[2]}`)
            styles.push(`border-inline-start-${type}: ${values[1]}`)
            styles.push(`border-inline-end-${type}: ${values[3]}`)
            break
    }

    return styles
}
