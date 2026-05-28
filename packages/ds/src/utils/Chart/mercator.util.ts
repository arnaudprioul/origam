/**
 * mercator.util.ts
 *
 * Web Mercator projection helpers for the OrigamChartMap component.
 *
 * Reference system: 1000 × 500 canvas, longitude [-180, 180], latitude [-85, 85].
 * The projection clips at ±85° latitude to avoid Mercator divergence at the poles.
 *
 * Verified reference point:
 *   Paris (lng=2.35, lat=48.85) → ~(506, 162) on a 1000×500 canvas.
 */

const LNG_MIN = -180
const LNG_MAX = 180
const LAT_MAX_MERCATOR = 85.051129

function mercatorY(lat: number): number {
    const radLat = (lat * Math.PI) / 180
    return Math.log(Math.tan(Math.PI / 4 + radLat / 2))
}

const MERC_Y_MIN = mercatorY(-LAT_MAX_MERCATOR)
const MERC_Y_MAX = mercatorY(LAT_MAX_MERCATOR)

/**
 * Projects a geographic coordinate (WGS-84) into SVG pixel space.
 * Uses the Web Mercator (EPSG:3857) formula normalised to [0, width] × [0, height].
 *
 * @param lng   Longitude in degrees, range [-180, 180]
 * @param lat   Latitude in degrees, range [-85, 85]
 * @param width  SVG canvas width  (default 1000)
 * @param height SVG canvas height (default 500)
 * @returns [x, y] in SVG pixel space
 */
export function mercatorProject(
    lng: number,
    lat: number,
    width = 1000,
    height = 500
): [number, number] {
    const clampedLat = Math.max(-LAT_MAX_MERCATOR, Math.min(LAT_MAX_MERCATOR, lat))

    const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * width

    const my = mercatorY(clampedLat)
    const y = ((MERC_Y_MAX - my) / (MERC_Y_MAX - MERC_Y_MIN)) * height

    return [Math.round(x * 10) / 10, Math.round(y * 10) / 10]
}

/**
 * Converts a single polygon (array of [lng, lat] pairs) to an SVG path string.
 *
 * @param polygon  Array of [lng, lat] geographic pairs
 * @param width    SVG canvas width  (default 1000)
 * @param height   SVG canvas height (default 500)
 * @returns SVG `d` attribute string (closed polygon with Z)
 */
export function polygonToSvgPath(
    polygon: Array<[number, number]>,
    width = 1000,
    height = 500
): string {
    if (polygon.length < 3) return ''

    const projected = polygon.map(([lng, lat]) => mercatorProject(lng, lat, width, height))
    const [first, ...rest] = projected
    const parts = [`M${first[0]},${first[1]}`]
    for (const [px, py] of rest) {
        parts.push(`L${px},${py}`)
    }
    parts.push('Z')
    return parts.join(' ')
}

/**
 * Converts a multi-polygon (array of polygon rings) to a single compound SVG path string.
 * All polygons are joined into one `d` attribute, allowing SVG fill rules to apply.
 *
 * @param multi   Array of polygons, each polygon is Array<[lng, lat]>
 * @param width   SVG canvas width  (default 1000)
 * @param height  SVG canvas height (default 500)
 * @returns SVG `d` attribute string (multiple M…Z subpaths)
 */
export function multiPolygonToSvgPath(
    multi: Array<Array<[number, number]>>,
    width = 1000,
    height = 500
): string {
    return multi
        .map((polygon) => polygonToSvgPath(polygon, width, height))
        .filter(Boolean)
        .join(' ')
}

/**
 * Computes the geographic centroid of a set of polygons (arithmetic mean of all vertices).
 * Returns the centroid projected into SVG pixel space.
 *
 * @param multi   Multi-polygon data (Array<Array<[lng, lat]>>)
 * @param width   SVG canvas width  (default 1000)
 * @param height  SVG canvas height (default 500)
 * @returns [x, y] centroid in SVG pixel space
 */
export function multiPolygonCentroid(
    multi: Array<Array<[number, number]>>,
    width = 1000,
    height = 500
): [number, number] {
    let lngSum = 0
    let latSum = 0
    let count = 0

    for (const polygon of multi) {
        for (const [lng, lat] of polygon) {
            lngSum += lng
            latSum += lat
            count++
        }
    }

    if (count === 0) return [width / 2, height / 2]

    return mercatorProject(lngSum / count, latSum / count, width, height)
}
