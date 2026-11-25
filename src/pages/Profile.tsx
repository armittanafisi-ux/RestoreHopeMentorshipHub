import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  doc,
  getDocFromServer,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import ProfileHeader from "../components/ProfileHeader";
import InfoCard from "../components/InfoCard";
import AvailabilityTable from "../components/AvailabilityTable";
import { DAYS, SLOTS, emptyAvailability } from "../types";
import type {
  Availability,
  Day,
  Role,
  SlotKey,
  UserProfile,
} from "../types";

interface ProfileProps {
  role?: Role;
}

type TextField = Exclude<keyof UserProfile, "availability" | "role">;

function text(value: unknown): string {
  return typeof value === "string" ? value : "";
}

// Convert the saved list into the table's format.
function readAvailability(value: unknown): Availability {
  const result = emptyAvailability();

  const selected = new Set<unknown>(
    Array.isArray(value) ? value : []
  );

  for (const day of DAYS) {
    for (const slot of SLOTS) {
      result[day][slot.key] = selected.has(
        day + "-" + slot.label
      );
    }
  }

  return result;
}

// Convert the table back into the saved list format.
function writeAvailability(value: Availability): string[] {
  const selected: string[] = [];

  for (const day of DAYS) {
    for (const slot of SLOTS) {
      if (value[day][slot.key]) {
        selected.push(day + "-" + slot.label);
      }
    }
  }

  return selected;
}

function readProfile(data: Record<string, unknown>): UserProfile {
  const savedRole = data.role;

  if (savedRole !== "mentor" && savedRole !== "mentee") {
    throw new Error("Unsupported profile role.");
  }

  // Use an edited display name, or combine the signup names.
  const name =
    text(data.name).trim() ||
    [text(data.firstName), text(data.lastName)].join(" ").trim();

  return {
    name,
    role: savedRole,
    location: text(data.location),
    favoriteColor: text(data.favoriteColor),
    personality: text(data.personality),
    interest: text(data.interest),
    goals: text(data.goals),
    hobbies: text(data.hobbies),
    availability: readAvailability(data.availability),
  };
}

// Include only editable text fields in the database update.
function profileTextFields(profile: UserProfile) {
  return {
    name: profile.name.trim(),
    location: profile.location.trim(),
    favoriteColor: profile.favoriteColor.trim(),
    personality: profile.personality.trim(),
    interest: profile.interest.trim(),
    goals: profile.goals.trim(),
    hobbies: profile.hobbies.trim(),
  };
}

export default function Profile({ role = "mentor" }: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile>(() => ({
    name: "",
    role,
    location: "",
    favoriteColor: "",
    personality: "",
    interest: "",
    goals: "",
    hobbies: "",
    availability: emptyAvailability(),
  }));

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAvailability, setIsEditingAvailability] =
    useState(false);

  const [ownerUid, setOwnerUid] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(0);

  const mounted = useRef(false);
  const saveLock = useRef(false);

  // Load the signed-in user's saved profile.
  useEffect(() => {
    let cancelled = false;
    mounted.current = true;

    async function loadProfile() {
      try {
        await auth.authStateReady();

        if (cancelled) {
          return;
        }

        const user = auth.currentUser;

        if (!user) {
          throw new Error("No signed-in account.");
        }

        const snapshot = await getDocFromServer(
          doc(db, "users", user.uid)
        );

        if (
          cancelled ||
          auth.currentUser?.uid !== user.uid
        ) {
          return;
        }

        if (!snapshot.exists()) {
          throw new Error("Profile document not found.");
        }

        const savedProfile = readProfile(snapshot.data());

        setProfile(savedProfile);
        setOwnerUid(user.uid);
        setError("");
      } catch (cause) {
        if (!cancelled) {
          console.error("Profile loading failed:", cause);
          setError(
            "We couldn't load your profile. Check your connection and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
      mounted.current = false;
    };
  }, [reload]);

  // Update one text field locally while editing.
  const setField = (key: TextField) => (value: string) => {
    if (saveLock.current) {
      return;
    }

    setError("");
    setMessage("");
    setProfile((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  // Update one availability checkbox locally while editing.
  const toggleSlot = (day: Day, slot: SlotKey) => {
    if (saveLock.current) {
      return;
    }

    setError("");
    setMessage("");

    setProfile((previous) => ({
      ...previous,
      availability: {
        ...previous.availability,
        [day]: {
          ...previous.availability[day],
          [slot]: !previous.availability[day][slot],
        },
      },
    }));
  };

  async function saveChanges(
    changes: Record<string, unknown>,
    successMessage: string
  ): Promise<boolean> {
    if (saveLock.current) {
      return false;
    }

    const uid = ownerUid;

    if (!uid || auth.currentUser?.uid !== uid) {
      setError("Your session changed. Refresh before saving.");
      return false;
    }

    saveLock.current = true;
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await updateDoc(doc(db, "users", uid), {
        ...changes,
        updatedAt: serverTimestamp(),
      });

      if (
        !mounted.current ||
        auth.currentUser?.uid !== uid
      ) {
        return false;
      }

      setMessage(successMessage);
      return true;
    } catch (cause) {
      console.error("Profile saving failed:", cause);

      if (
        mounted.current &&
        auth.currentUser?.uid === uid
      ) {
        setError(
          "Could not save your changes. They are still on this page. Try saving again."
        );
      }

      return false;
    } finally {
      saveLock.current = false;

      if (mounted.current) {
        setSaving(false);
      }
    }
  }

  async function handleProfileEdit() {
    if (saveLock.current) {
      return;
    }

    if (!isEditingProfile) {
      setError("");
      setMessage("");
      setIsEditingProfile(true);
      return;
    }

    const details = profileTextFields(profile);

    if (!details.name || details.name.length > 201) {
      setError("Enter a name between 1 and 201 characters.");
      return;
    }

    if (Object.values(details).some((value) => value.length > 2000)) {
      setError("Keep each profile detail within 2,000 characters.");
      return;
    }

    const saved = await saveChanges(
      { ...details },
      "Profile saved."
    );

    if (
      saved &&
      mounted.current &&
      auth.currentUser?.uid === ownerUid
    ) {
      setProfile((previous) => ({
        ...previous,
        ...details,
      }));

      setIsEditingProfile(false);
    }
  }

  async function handleAvailabilityEdit() {
    if (saveLock.current) {
      return;
    }

    if (!isEditingAvailability) {
      setError("");
      setMessage("");
      setIsEditingAvailability(true);
      return;
    }

    const saved = await saveChanges(
      {
        availability: writeAvailability(profile.availability),
      },
      "Availability saved."
    );

    if (
      saved &&
      mounted.current &&
      auth.currentUser?.uid === ownerUid
    ) {
      setIsEditingAvailability(false);
    }
  }

  if (
    loading ||
    (ownerUid !== "" && auth.currentUser?.uid !== ownerUid)
  ) {
    return (
      <main className="p-6">
        <p role="status">Loading your profile…</p>
      </main>
    );
  }

  if (!ownerUid) {
    return (
      <main className="p-6 text-left">
        <p role="alert">
          {error || "Your profile could not be loaded."}
        </p>

        <button
          type="button"
          onClick={() => {
            setError("");
            setMessage("");
            setLoading(true);
            setReload((previous) => previous + 1);
          }}
          className="mt-4 rounded-lg bg-[#b8dedb] px-5 py-2"
        >
          Try again
        </button>

        <Link
          to="/login"
          className="ml-4 inline-block underline"
        >
          Back to login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eddcf2] px-4 pb-12 pt-6 text-[#3a2540] [&_h1]:text-[#3a2540]! [&_h2]:text-[#3a2540]! [&_h3]:text-[#3a2540]!">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-6">
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        {saving && (
          <p role="status" className="text-sm">
            Saving…
          </p>
        )}

        {message && (
          <p role="status" className="text-sm text-green-800">
            {message}
          </p>
        )}

        <fieldset
          disabled={saving}
          aria-busy={saving}
          className="m-0 min-w-0 border-0 p-0"
        >
          <div className="flex flex-col gap-6">
            <ProfileHeader
              name={profile.name}
              isEditing={isEditingProfile}
              onNameChange={setField("name")}
              onToggleEdit={() => {
                void handleProfileEdit();
              }}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <InfoCard
                title="Personal details"
                isEditing={isEditingProfile}
                rows={[
                  {
                    label: "Currently lives in",
                    value: profile.location,
                    onChange: setField("location"),
                  },
                  {
                    label: "Favorite color",
                    value: profile.favoriteColor,
                    onChange: setField("favoriteColor"),
                  },
                  {
                    label: "3 words to describe their personality",
                    value: profile.personality,
                    onChange: setField("personality"),
                  },
                ]}
              />

              <InfoCard
                title="Interests & goals"
                isEditing={isEditingProfile}
                rows={[
                  {
                    label: "Interested because",
                    value: profile.interest,
                    onChange: setField("interest"),
                  },
                  {
                    label: "Goals to work on",
                    value: profile.goals,
                    onChange: setField("goals"),
                  },
                  {
                    label: "Hobbies",
                    value: profile.hobbies,
                    onChange: setField("hobbies"),
                  },
                ]}
              />
            </div>

            <AvailabilityTable
              availability={profile.availability}
              isEditing={isEditingAvailability}
              onToggleEdit={() => {
                void handleAvailabilityEdit();
              }}
              onToggleSlot={toggleSlot}
            />
          </div>
        </fieldset>
      </div>
    </main>
  );
}