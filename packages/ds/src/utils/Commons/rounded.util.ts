/**
 * Format rounded styles var.
 *
 * @param values …
 */
export function formatRoundedStylesVar (values: Array<string>) {
    const styles = []

    switch (values.length) {
        case 1 :
            styles.push(`border-radius: ${values[0]}`)
            break
        case 4 :
            styles.push(`border-start-start-radius: ${values[0]}`)
            styles.push(`border-start-end-radius: ${values[1]}`)
            styles.push(`border-end-start-radius: ${values[2]}`)
            styles.push(`border-end-end-radius: ${values[3]}`)
            break
    }

    return styles
}
