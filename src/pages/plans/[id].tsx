import { useRouter } from "next/router";

export default function PlanPage() {
    const { id } = useRouter().query;
    return <div>{id}</div>;
}
