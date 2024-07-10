import video from "@/database/video"
export default defineEventHandler((event) => {
    const {id} = event.context.params || {}
    return video.find((v:any) => v.bvid === id)
})