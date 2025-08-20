import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AppUserData } from "../../../../features/auth/types";
import { db } from "../../../../firebase/firestore";
import {
    approveMembership,
    rejectMembership,
} from "../../../../services/user-service";
import { Button, Card } from "../../../../shared/components";

export const MembershipRequestsPage = () => {
    const [pendingUsers, setPendingUsers] = useState<AppUserData[]>([]);

    useEffect(() => {
        const fetchPending = async () => {
            const q = query(
                collection(db, "users"),
                where("membershipTest.status", "==", "pending")
            );
            const snap = await getDocs(q);
            setPendingUsers(
                snap.docs.map((d) => ({
                    uid: d.id,
                    ...(d.data() as AppUserData),
                }))
            );
        };

        fetchPending();
    }, []);

    const handleApprove = async (uid: string) => {
        await approveMembership(uid);
        setPendingUsers((prev) => prev.filter((u) => u.uid !== uid));
    };

    const handleReject = async (uid: string) => {
        await rejectMembership(uid);
        setPendingUsers((prev) => prev.filter((u) => u.uid !== uid));
    };

    return (
        <div>
            <h2>Membership Requests</h2>
            {pendingUsers.length === 0 && <p>No pending requests.</p>}
            <div style={{ display: "grid", gap: "1rem" }}>
                {pendingUsers.map((user) => (
                    <Card key={user.uid}>
                        <h3>{user.displayName ?? user.email}</h3>
                        <p>
                            Submitted:{" "}
                            {user.membershipTest?.submittedAt
                                ?.toDate()
                                .toLocaleString()}
                        </p>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                            <Button onClick={() => handleApprove(user.uid)}>
                                Approve
                            </Button>
                            <Button
                                variant="button--red"
                                onClick={() => handleReject(user.uid)}
                            >
                                Reject
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
