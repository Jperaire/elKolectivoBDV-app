import { Card } from "@/shared/components";
import { New } from "../components/New";

export const NewsPage = () => {
    return (
        <div className="page">
            <h1>Noticies</h1>

            <Card>
                <section>
                    <New />
                </section>
            </Card>
        </div>
    );
};
