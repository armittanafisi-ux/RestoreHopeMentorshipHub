import { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import InfoCard from "../components/InfoCard";
import AvailabilityTable from "../components/AvailabilityTable";
import { emptyAvailability } from "../types";
import type { Day, Role, SlotKey, UserProfile } from "../types";

interface ProfileProps {
  role?: Role;
}

type TextField = Exclude<keyof UserProfile, "availability" | "role">;

export default function Profile({ role = "mentor" }: ProfileProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "[NAME]",
    role,
    location: "",
    favoriteColor: "",
    personality: "",
    interest: "",
    goals: "",
    hobbies: "",
    availability: emptyAvailability(),
  });

  // Returns a handler that updates one text field and leaves the rest alone
  const setField = (key: TextField) => (value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const toggleSlot = (day: Day, slot: SlotKey) =>
    setProfile((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: { ...prev.availability[day], [slot]: !prev.availability[day][slot] },
      },
    }));

  return (
    <main className="min-h-screen bg-[#eddcf2] px-4 pb-12 pt-6 text-[#3a2540]">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-6">
        <ProfileHeader
          name={profile.name}
          isEditing={isEditingProfile}
          onNameChange={setField("name")}
          onToggleEdit={() => setIsEditingProfile((v) => !v)}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <InfoCard
            title="Personal details"
            isEditing={isEditingProfile}
            rows={[
              { label: "Currently lives in", value: profile.location, onChange: setField("location") },
              { label: "Favorite color", value: profile.favoriteColor, onChange: setField("favoriteColor") },
              { label: "3 words to describe their personality", value: profile.personality, onChange: setField("personality") },
            ]}
          />
          <InfoCard
            title="Interests & goals"
            isEditing={isEditingProfile}
            rows={[
              { label: "Interested because", value: profile.interest, onChange: setField("interest") },
              { label: "Goals to work on", value: profile.goals, onChange: setField("goals") },
              { label: "Hobbies", value: profile.hobbies, onChange: setField("hobbies") },
            ]}
          />
        </div>

        <AvailabilityTable
          availability={profile.availability}
          isEditing={isEditingAvailability}
          onToggleEdit={() => setIsEditingAvailability((v) => !v)}
          onToggleSlot={toggleSlot}
        />
      </div>
    </main>
  );
}