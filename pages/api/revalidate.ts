
export const revalidate = async (res: any, req: any) => {
    try {
        await res.revalidate("/dashboard/a/transaction")
        return res.json({ revalidate: true })
    }
    catch (err) {
        return res.status(500).send("Error revalidating")
    }
}

export default revalidate