import { sendFromDir } from '~~/server/utils/send-from-dir'
import { STATIC_STORIES_DIR } from '~~/app/consts/static-serve.const'

export default defineEventHandler(async (event) => {
    const path = getRouterParam(event, '_') ?? ''
    await sendFromDir(event, STATIC_STORIES_DIR, path, { fallbackToIndex: true })
})
