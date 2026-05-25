import Dashboard from "@/src/author/dashboard/Dashboard"
import { nextFetch } from "@/utils/nextFetch"

async function AuthorDashboardPage() {
    const res = await nextFetch("/payment/overview-all")
    const data = res.data || {}
    console.log("response ++===>>>", data)
    return (
        <Dashboard data={data} />
    )
}

export default AuthorDashboardPage