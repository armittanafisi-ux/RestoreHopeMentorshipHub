import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDocFromServer } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import type { Role } from "../types";


type AccessRole = Role | "admin";

type ProtectedRouteProps = {
  allowedRoles: readonly AccessRole[];
  children: ReactNode;
};

type AccessState =
  | { status: "loading" }
  | { status: "missing-profile" }
  | { status: "error"; message: string }
  | { status: "ready"; uid: string; role: AccessRole };

function AccessNotice({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#f1def1] p-6 text-left text-[#3c2941]">
      <h1 className="m-0! text-2xl! font-semibold! text-[#3c2941]!">
        {title}
      </h1>

      <div className="mt-4 flex flex-col items-start gap-4">
        {children}
      </div>

      <Link
        to="/login"
        className="mt-6 inline-block font-semibold underline"
      >
        Back to login / switch account
      </Link>
    </main>
  );
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const navigate = useNavigate();

  const [access, setAccess] = useState<AccessState>({
    status: "loading",
  });

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    let requestNumber = 0;

    async function loadProfile(userId: string, requestId: number) {
      try {
        // Check the saved role directly with Firestore.
        const profile = await getDocFromServer(
          doc(db, "users", userId)
        );

        // Ignore results belonging to an old account or an old request.
        if (
          !active ||
          requestId !== requestNumber ||
          auth.currentUser?.uid !== userId
        ) {
          return;
        }

        if (!profile.exists()) {
          setAccess({ status: "missing-profile" });
          return;
        }

        const savedRole: unknown = profile.data().role;

        if (
          savedRole !== "mentor" &&
          savedRole !== "mentee" &&
          savedRole !== "admin"
        ) {
          setAccess({
            status: "error",
            message:
              "Your account's access has not been configured correctly. Contact program staff.",
          });
          return;
        }

        setAccess({
          status: "ready",
          uid: userId,
          role: savedRole,
        });
      } catch (cause) {
        if (
          !active ||
          requestId !== requestNumber ||
          auth.currentUser?.uid !== userId
        ) {
          return;
        }

        console.error("Access check failed:", cause);

        setAccess({
          status: "error",
          message:
            "We couldn't verify your access. Check your connection and try again.",
        });
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!active) {
        return;
      }

      const requestId = ++requestNumber;

      setAccess({ status: "loading" });

      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      void loadProfile(user.uid, requestId);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [navigate, retry]);

  if (access.status === "loading") {
    return (
      <p role="status" className="p-6">
        Checking your account access…
      </p>
    );
  }

  if (access.status === "missing-profile") {
    return (
      <AccessNotice title="Complete your registration">
        <p>
        </p>

        <Link
          to="/signup"
          className="rounded-lg bg-[#b8dedb] px-5 py-2 font-semibold"
        >
          Complete registration
        </Link>
      </AccessNotice>
    );
  }

  if (access.status === "error") {
    return (
      <AccessNotice title="Unable to verify access">
        <p role="alert">{access.message}</p>

        <button
          type="button"
          onClick={() => {
            setAccess({ status: "loading" });
            setRetry((previous) => previous + 1);
          }}
          className="rounded-lg bg-[#b8dedb] px-5 py-2 font-semibold"
        >
          Try again
        </button>
      </AccessNotice>
    );
  }

  if (auth.currentUser?.uid !== access.uid) {
    return (
      <p role="status" className="p-6">
        Checking your account access…
      </p>
    );
  }

  if (!allowedRoles.includes(access.role)) {
    return (
      <AccessNotice title="Access denied">
        <p>You do not have permission to open this page.</p>
      </AccessNotice>
    );
  }

  return <>{children}</>;
}