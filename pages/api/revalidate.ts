export default async function revalidate(res: any) {
    try {
        await res.revalidate('/dashboard/a/transaction')
        return res.json({ revalidate: true })
    } catch (err) {
        return res.status(500).send("Error revalidating")
    }
}